import CafeTemplate from './CafeTemplate';
import { BusinessData } from '@/lib/types';
type Props = { business: BusinessData };
export default function CafeCozyTemplate({ business }: Props) {
  return <CafeTemplate business={business} />;
}
