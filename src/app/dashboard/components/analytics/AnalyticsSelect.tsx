import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
type Props = {
  analyticsViewing: string;
  setAnalyticsViewing: (value: string) => void;
};
export default function AnalyticsSelect({
  analyticsViewing,
  setAnalyticsViewing,
}: Props) {
  return (
    <Select
      onValueChange={(value) => setAnalyticsViewing(value)}
      value={analyticsViewing}
    >
      <SelectTrigger className="w-[180px] border-2 bg-white font-semibold text-secondary-50 outline-none ring-0 focus:border-secondary-50 focus:outline-none focus:ring-0">
        <SelectValue placeholder={analyticsViewing} />
      </SelectTrigger>
      <SelectContent className="bg-white p-0 font-semibold text-secondary-50 shadow-md">
        <SelectGroup>
          <SelectItem
            className="cursor-pointer hover:bg-[#f3f3f3]"
            value="chatbot"
          >
            Chatbot analytics
          </SelectItem>
          <SelectItem
            className="cursor-pointer hover:bg-[#f3f3f3]"
            value="agent"
          >
            Agent analytics
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
