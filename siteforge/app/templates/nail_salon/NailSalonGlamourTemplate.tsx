import NailSalonTemplate from './NailSalonTemplate';
import { BusinessData } from '@/lib/types';
type Props = { business: BusinessData };
export default function NailSalonGlamourTemplate({ business }: Props) {
  return <NailSalonTemplate business={business} />;
}
