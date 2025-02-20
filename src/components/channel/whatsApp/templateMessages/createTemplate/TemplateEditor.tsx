"use client"
import useCreateTemplateStore from '@/stores/useCreateTemplate'
import TemplateBody from './TemplateBody'
import TemplateButtons from './TemplateButtons'
import TemplateFooter from './TemplateFooter'
import TemplateHeader from './TemplateHeader'
import { useEffect } from 'react'

type Props = {
    errorsObject: any;
    setErrorsObject: any
}

export default function TemplateEditor({ errorsObject, setErrorsObject }: Props) {
    const fetchAllVariables = useCreateTemplateStore((state) => state.fetchAllVariables);

    useEffect(() => {
        fetchAllVariables();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className='overflow-y-auto w-[441px]'>
            <div className='pe-12 max-h-[calc(100vh-280px)]'>
                <TemplateHeader />
                <TemplateBody
                    errorsObject={errorsObject}
                    setErrorsObject={setErrorsObject}
                />
                <TemplateFooter />
                <TemplateButtons
                    errorsObject={errorsObject}
                    setErrorsObject={setErrorsObject}
                />
            </div>
        </div>
    )
}