import config from 'config';
import axios from 'axios';

/**
 * アクセストークンの取得
 * @returns {string} accessToken
 */
const getAccessToken = async () => {
  // apiKeyを取得
  const apikey = config.ibmCloud.apikey;

  // paramの追加
  const getTokenParams = new URLSearchParams();
  getTokenParams.append('grant_type', 'urn:ibm:params:oauth:grant-type:apikey');
  getTokenParams.append('apikey', apikey);

  // ヘッダーを追加
  const getTokenConfigs = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  // axiosでエンドポイントにアクセスしaccessTokenを取得
  const accessTokenResult = await axios.post(
    'https://iam.cloud.ibm.com/identity/token',
    getTokenParams,
    getTokenConfigs,
  );
  const accessToken = accessTokenResult.data['access_token'];
  return accessToken;
};

export const certificateUpdate = async (): Promise<object> => {
  try {
    // 1. accessTokenの取得
    const accessToken = await getAccessToken();

    // 2. certCrnを取得
    // instanseId, certificateNameを環境変数から取得
    const instanseId = config.certificateManager.instanseId;
    const certificateName = config.certificateManager.certificateName;

    // ヘッダーを追加
    const certCrnConfigs = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    // axiosでエンドポイントにアクセスしcertificatesを取得
    const certCrnResult = await axios.get(
      `https://jp-tok.certificate-manager.cloud.ibm.com/api/v3/${encodeURIComponent(
        instanseId,
      )}/certificates?order=expires_on&page_number=0&page_size=100`,
      certCrnConfigs,
    );
    const certCrn = certCrnResult.data.certificates.find((certificate) => {
      return certificate.name === certificateName;
    })?.['_id'];

    // 3. SSL/TLS証明書を更新
    const certUpdateConfigs = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };

    // requestDataの用意
    const requestData = {
      certCrn: certCrn,
      clusterID: config.certificateManager.clusterID,
      secretName: config.certificateManager.secretName,
      state: 'update_true',
    };

    // axiosでエンドポイントにアクセスし鍵の更新
    await axios.put('https://containers.cloud.ibm.com/global/v1/alb/albsecrets', requestData, certUpdateConfigs);

    // 空のオブジェクトを返却
    return {};
  } catch (err) {
    console.log(err.response);
    throw err.response || err;
  }
};
