import { tinaField } from "tinacms/dist/react"
import { TinaMarkdown } from "tinacms/dist/rich-text"

function SolutionLanding({solution}){
    return(
        <div style={{ minHeight: '100%' }} className="landing flex flex-col items-center justify-center  w-full">
            <div className='w-90 md:w-150'>
                <h1 data-tina-field={tinaField(solution,'title')} className="text-[32px] md:text-[40px] lg:text-[60px] font-bold text-center mb-4">{solution.title}</h1>
                <div data-tina-field={tinaField(solution,'description')}>
                    <TinaMarkdown
                    content={solution.description}
                    components={{
                        p: ({ children }) => (
                        <p className={`text-[16px] text-center secondary-text mb-6`}>
                        {children}
                        </p>
                        ),
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default SolutionLanding