import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

type Props = {
    onEmojiSelect: (emoji: any) => void,
    emojiPerLine?: number
}


export default function EmojiPicker({ onEmojiSelect, emojiPerLine = 6 }: Props) {
    return (
        <Picker
            skinTonePosition="none"
            perLine={emojiPerLine}
            maxFrequentRows={0}
            previewPosition="none"
            autoFocus={true}
            theme="light"
            data={data}
            onEmojiSelect={onEmojiSelect}
        />
    )
}