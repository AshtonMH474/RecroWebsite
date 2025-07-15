import IconRenderer from "@/components/utils/IconRenderer"
import { tinaField } from "tinacms/dist/react"
import { TinaMarkdown } from "tinacms/dist/rich-text"

function StatementCard({statement}){
    return(
        <div className="border border-white/15 rounded-[8px] bg-[#1A1A1E] w-[300px] h-[260px] px-4 py-6 cursor-pointer">
            <div className="flex items-center mb-3 gap-x-3">
                {statement.icon && (
                    <div data-tina-field={tinaField(statement,'icon')} className="bg-primary rounded-[10px] h-16 w-16 flex-shrink-0 flex items-center justify-center">
                        <IconRenderer size="50px" color="#FAF3E0" iconName={statement.icon} />
                    </div>
                )}
                {statement.title && (
                    <h3 data-tina-field={tinaField(statement,'title')} className="text-[20px] font-bold text-white leading-tight flex-1">
                        {statement.title}
                    </h3>
                )}
            </div>
            {statement.description && (
                <div data-tina-field={tinaField(statement,'description')}>
                  <TinaMarkdown
                    content={statement.description}
                    components={{
                      p: ({ children }) => (
                        <p className="text-[#C2C2BC] noContentDes text-ellipsis text-[16px]">
                          {children}
                        </p>
                      ),
                    }}
                  />
                </div>
              )}
        </div>
    )
}


export default StatementCard