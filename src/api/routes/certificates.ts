import { Router, Request, Response, NextFunction } from 'express';
import { certificateUpdate } from '../../services/certificateUpdateService';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: certificates
 *     description: 'SSL/TLS証明書'
 * '/api/v1/certificates/update':
 *  get:
 *   tags:
 *     - certificates
 *   summary: 'SSL/TLS証明書を更新する'
 *   description: '環境変数から証明書更新に必要な情報を取得し更新する。'
 *   responses:
 *     200:
 *       description: 'success'
 *     400:
 *       description: 'Bad Request'
 */
export default (app: Router) => {
  app.use('/v1/certificates', router);

  router.get('/update', async (req: Request, res: Response, next: NextFunction) => {
    try {
      // サービスの呼び出し
      await certificateUpdate();

      res.json({});
    } catch (err) {
      // 発生したエラーをエラーハンドラーに投げる。
      next(err.response);
    }
  });
};
