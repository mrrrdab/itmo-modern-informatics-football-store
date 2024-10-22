import { Injectable } from '@nestjs/common';
import { CookieOptions } from 'express';
import NodeConfig from '@/utils/node/node.config';
import NodeENV from '@/utils/node/types/enum/node.env.enum';

@Injectable()
class JWTConfig {
  private readonly jwtCookieSettings: Record<NodeENV, CookieOptions> = {
    dev: {
      secure: false
    },
    prod: {
      secure: true
    }
  };

  constructor(private readonly nodeConfig: NodeConfig) {}

  public getCookieSettings(): CookieOptions {
    return {
      httpOnly: true,
      ...this.jwtCookieSettings[this.nodeConfig.getNodeENV()]
    };
  }
}
export default JWTConfig;
