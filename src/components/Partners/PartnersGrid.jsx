import { useMemo } from 'react';
import { tinaField } from 'tinacms/dist/react';
import Image from 'next/image';

export default function PartnersGrid({ partnersRes, ...block }) {
  // Extract all partners
  const allPartners = partnersRes?.partnerConnection?.edges.map((e) => e.node) || [];

  // Filter partners without breaking Tina editing
  const filtered = useMemo(() => {
    const category = block.category?.category;

    if (category && category !== 'All') {
      return allPartners.filter((partner) => partner?.category?.category === category);
    }
    return allPartners;
  }, [allPartners, block.category?.category]);

  return (
    <div id={block.partners_id} className="relative bg-black w-full overflow-hidden pb-24">
      {/* Heading Section */}
      <div className="flex flex-col items-center text-center mt-32 pb-12">
        {block.partners_heading && (
          <h2
            data-tina-field={tinaField(block, 'partners_heading')}
            className="font-bold text-[32px] md:text-[40px] text-white px-4"
          >
            {block.partners_heading}
          </h2>
        )}

        <div
          data-tina-field={tinaField(block, 'underline_width')}
          style={{ width: block.underline_width }}
          className="h-1 rounded-[12px] bg-primary mt-2"
        />
      </div>

      {/* Partners Grid */}
      <div className="relative w-full max-w-[1000px] mx-auto overflow-hidden">
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-12 px-4">
          {filtered.map((partner, index) => {
            const Wrapper = partner.link ? 'a' : 'div';

            return (
              <Wrapper
                key={partner._id || partner.title || index}
                className="flex-1 min-w-[250px] sm:basis-[45%] lg:basis-[30%] max-w-[300px]"
                {...(partner.link ? { href: partner.link, target: '_blank' } : {})}
              >
                <div
                  className="flex items-center justify-center gap-x-2 border border-white/15 rounded-[8px] bg-[#1A1A1E] w-[300px] h-[120px] px-4 py-6"
                  data-tina-field={tinaField(partner, 'logo')}
                >
                  <Image
                    className="max-h-[100px] h-auto object-contain"
                    src={partner.logo}
                    alt={partner.title || 'partner'}
                    width={200}
                    height={100}
                  />

                  {partner.needsTitle && partner.title && (
                    <h1 className="font-bold text-[26px] text-center">{partner.title}</h1>
                  )}
                </div>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </div>
  );
}
