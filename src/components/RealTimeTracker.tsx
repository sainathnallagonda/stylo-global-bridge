
import RealTimeOrderTracking from './RealTimeOrderTracking';

interface RealTimeTrackerProps {
  orderId: string;
}

const RealTimeTracker = ({ orderId }: RealTimeTrackerProps) => {
  return <RealTimeOrderTracking orderId={orderId} />;
};

export default RealTimeTracker;
