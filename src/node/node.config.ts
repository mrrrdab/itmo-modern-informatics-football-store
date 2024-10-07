import NodeENV from './node.env.enum';

abstract class NodeConfig {
  protected readonly nodeENV: NodeENV;
  protected abstract initConfig(): void;
}
export default NodeConfig;
