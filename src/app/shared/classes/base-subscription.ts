import {SubscriptionLike, SubSink} from './sub-sink';

export abstract class BaseSubscription {
  private subsink = new SubSink();

  protected unsubscribe(): void {
    this.subsink.unsubscribe();
  }

  set sink(subscription: SubscriptionLike) {
    this.subsink.sink = subscription;
  }
}
