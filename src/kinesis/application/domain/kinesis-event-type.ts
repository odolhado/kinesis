export interface BaseEvent {
  aggregateId: string;
  context: {
    correlationId?: string;
  };
  createdAt: number;
  eventId: string;
  payload: any; // TODO:: make it generic | union
  sequenceNumber: number;
  source: string;
  type: KinesisEventType;
}

export enum KinesisEventType {
  USER_LIMIT_CREATED = 'USER_LIMIT_CREATED',
  LIMIT_USER_CREATED = 'LIMIT_USER_CREATED',
  LIMIT_USER_PENDING_PAYMENT_CREATED = 'LIMIT_USER_PENDING_PAYMENT_CREATED',
  USER_LIMIT_PROGRESS_CHANGED = 'USER_LIMIT_PROGRESS_CHANGED',
  USER_LIMIT_CHANGE_SOURCE_ADDED = 'USER_LIMIT_CHANGE_SOURCE_ADDED',
  LIMIT_USER_PENDING_PAYMENT_PROCESSED = 'LIMIT_USER_PENDING_PAYMENT_PROCESSED',
  USER_LIMIT_RESET = 'USER_LIMIT_RESET',
}

export interface LimitUserCreatedPayload {
  brandId: string;
  currencyCode: string;
  jurisdiction: string;
  userId: string;
}

export interface LimitUserPendingPaymentCreatedPayload {
  brandId: string;
  payment: {
    amount: string;
    currencyCode: string;
    paymentId: string;
  };
  userId: string;
}

export interface UserLimitCreatedPayload {
  activeFrom: number;
  brandId: string;
  currencyCode: string;
  nextResetTime: number;
  period: 'DAY' | 'WEEK' | 'MONTH';
  status: 'ACTIVE';
  type: 'DEPOSIT' | 'SESSION';
  userId: string;
  userLimitId: string;
  value: string;
}

export interface UserLimitProgressChangedPayload {
  amount: string;
  brandId: string;
  currencyCode: string;
  nextResetTime: number;
  previousProgress: string;
  remainingAmount: string;
  userId: string;
  userLimitId: string;
}

export interface UserLimitChangeSourceAddedPayload {
  amount: string;
  brandId: string;
  expiresAt: number;
  period: 'DAY' | 'WEEK' | 'MONTH';
  sourceId: string;
  type: 'DEPOSIT' | 'SESSION';
  userId: string;
}

export interface LimitUserPendingPaymentProcessedPayload {
  brandId: string;
  paymentId: string;
  userId: string;
}

export interface UserLimitResetPayload {
  brandId: string;
  currencyCode: string;
  nextResetTime: number;
  period: 'DAY' | 'WEEK' | 'MONTH';
  resetAmount: string;
  resetPercentage: string;
  type: 'DEPOSIT' | 'SESSION';
  unusedAmount: string;
  userId: string;
  userLimitId: string;
}

export interface LimitUserCreatedEvent extends BaseEvent {
  type: KinesisEventType.LIMIT_USER_CREATED;
  payload: LimitUserCreatedPayload;
}

export interface LimitUserPendingPaymentCreatedEvent extends BaseEvent {
  type: KinesisEventType.LIMIT_USER_PENDING_PAYMENT_CREATED;
  payload: LimitUserPendingPaymentCreatedPayload;
}

export interface UserLimitCreatedEvent extends BaseEvent {
  type: KinesisEventType.USER_LIMIT_CREATED;
  payload: UserLimitCreatedPayload;
}

export interface UserLimitProgressChangedEvent extends BaseEvent {
  type: KinesisEventType.USER_LIMIT_PROGRESS_CHANGED;
  payload: UserLimitProgressChangedPayload;
}

export interface UserLimitChangeSourceAddedEvent extends BaseEvent {
  type: KinesisEventType.USER_LIMIT_CHANGE_SOURCE_ADDED;
  payload: UserLimitChangeSourceAddedPayload;
}

export interface LimitUserPendingPaymentProcessedEvent extends BaseEvent {
  type: KinesisEventType.LIMIT_USER_PENDING_PAYMENT_PROCESSED;
  payload: LimitUserPendingPaymentProcessedPayload;
}

export interface UserLimitResetEvent extends BaseEvent {
  type: KinesisEventType.USER_LIMIT_RESET;
  payload: UserLimitResetPayload;
}

export type Event =
  | LimitUserCreatedEvent
  | LimitUserPendingPaymentCreatedEvent
  | UserLimitCreatedEvent
  | UserLimitProgressChangedEvent
  | UserLimitChangeSourceAddedEvent
  | LimitUserPendingPaymentProcessedEvent
  | UserLimitResetEvent;
