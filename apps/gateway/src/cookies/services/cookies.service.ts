import { Auth } from '@demo-chat/shared';
import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class CookiesService {
  public async setRefreshToken(res: Response, refreshToken: string) {
    // Get exp from token
    const decoded = JSON.parse(
      Buffer.from(refreshToken.split('.')[1], 'base64').toString()
    ) as Auth.ITokenPayload;

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      expires: new Date(decoded.exp * 1000),
    });

    return res;
  }

  public async clearRefreshToken(res: Response) {
    res.clearCookie('refreshToken');
    return res;
  }
}
