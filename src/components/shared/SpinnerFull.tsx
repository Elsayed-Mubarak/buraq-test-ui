
type Props = {}

export default function SpinnerFull({ }: Props) {
    return (
        <div className="h-screen w-full flex items-center justify-center">
            <span className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></span>
        </div>
    )
}