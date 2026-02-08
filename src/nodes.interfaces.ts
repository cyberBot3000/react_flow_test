export type NodeType = 'empty' | 'default' | 'group';

export interface BaseNodeType {
  type: NodeType;
  id: string;
}

export interface DefaultNodeType extends BaseNodeType {
  type: 'default';
  name: string;
}

export interface GroupNodeType extends BaseNodeType {
  type: 'group';
  name: string;
  children: Node[][];
}

export interface EmptyNodeType extends BaseNodeType {
  type: 'empty';
}


export type Node = DefaultNodeType | GroupNodeType | EmptyNodeType;


const node: Node = {
  type: 'default',
  id: 'sdfjljsdalkjldsajklfdjsa',
  name: 'sslkjsdlfjds',

}