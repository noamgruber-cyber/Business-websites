import PhotographyTemplate from './PhotographyTemplate';
import { BusinessData } from '@/lib/types';
type Props = { business: BusinessData };
export default function PhotographyMinimalTemplate({ business }: Props) {
  return <PhotographyTemplate business={business} />;
}
