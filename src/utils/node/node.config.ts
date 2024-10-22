import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import NodeENV from './types/enum/node.env.enum';

@Injectable()
class NodeConfig {
  private readonly nodeENV: NodeENV;

  constructor(private readonly configService: ConfigService) {
    this.nodeENV = this.configService.get('nodeENV') as NodeENV;
  }

  public getNodeENV(): NodeENV {
    return this.nodeENV;
  }
}
export default NodeConfig;
