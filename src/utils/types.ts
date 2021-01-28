export enum Status {
    IDLE = 'idle',
    PENDING = 'pending',
    RESOLVED = 'resolved',
    REJECTED = 'rejected'
}

export interface State {
    status?: Status,
    data?: any,
    error?: string|null
}

export interface Action {
    type: Status,
    data?: any,
    error?: any,
}

export interface MessageType {
    id: number;
    children?: MessageType[];
    parentId: number;
    isPublic: boolean,
    user: string,
    createdAt: string,
    content: string
  }