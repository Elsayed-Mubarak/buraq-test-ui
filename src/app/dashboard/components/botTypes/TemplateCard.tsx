
type TemplateCardProprs = {
  title: string;
  description: string;
  image: any;  // Provide the image source as a string
}

import Image from "next/image";


const TemplateCard = ({ title, description, image }: TemplateCardProprs) => {
  return (
    <div className="  bg-white flex flex-col justify-between rounded-xl overflow-hidden border">
      <Image
        src={image}
        alt={title}
        width={400}
        height={300}
        loading="lazy"
        priority={false}
        className="w-full h-32 object-cover"
      />
      <div className="p-4 h-50  flex flex-col justify-between ">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <div className="flex justify-between items-center">

          <div className="flex justify-between items-center w-full ">
            <button className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              Use this template
            </button>
            <a href="#" className=" block text-blue-500 hover:underline text-sm">
              Preview
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
