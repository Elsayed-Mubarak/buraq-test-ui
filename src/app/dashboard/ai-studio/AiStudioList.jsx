import AiStudio from "./AiStudio";
import { Root, Trigger, Content } from "@radix-ui/react-popover";

export default function AiStudioList() {
  return (
    <div className="flex flex-col gap-3">
      <AiStudio />
      <Root>
        <Trigger>...</Trigger>
        <Content>
          <p>asd</p>
          <p>asd</p>
          <p>asd</p>
        </Content>
      </Root>
    </div>
  );
}
