
import templateImage from "../../components/shared/imgs/template_img.png"; // Correctly import the image

export default function MainLayout({ children }: React.PropsWithChildren) {

  const industries = [
    "All Templates",
    "Banking & Finance",
    "Customer Support",
    "E-commerce",
    "Healthcare",
    "Hospitality",
    "Insurance",
    "Lead Generation",
    "Real Estate",
  ];

  const templates = [
    {
      title: "Lead Generation for B2B",
      description:
        "Probe visitors coming to your channels by asking qualifying questions and generate quality SQLs.",
      image: templateImage, // Use imported image
    },
    {
      title: "Appointment Booking",
      description:
        "Collect the necessary details to book an appointment for your service through bots.",
      image: templateImage, // Use imported image
    },
    {
      title: "Lead Generation for Insurance Policy",
      description:
        "Reduce operational expenses, improve customer experience without increasing overhead with a virtual manager.",
      image: templateImage, // Use imported image
    },
    {
      title: "Lead Generation for B2B",
      description:
        "Probe visitors coming to your channels by asking qualifying questions and generate quality SQLs.",
      image: templateImage, // Use imported image
    },
    {
      title: "Appointment Booking",
      description:
        "Collect the necessary details to book an appointment for your service through bots.",
      image: templateImage, // Use imported image
    },
    {
      title: "Lead Generation for Insurance Policy",
      description:
        "Reduce operational expenses, improve customer experience without increasing overhead with a virtual manager.",
      image: templateImage, // Use imported image
    },
  ];


  return (
    <div className="flex">

      {/* Sidebar */}
      <aside className=" w-80 sticky h-[100vh] top-0 flex  items-center  ">
        <div className=" ps-8 w-full " >
          <h2 className="text-xl text-[rgb(9, 36, 69)] font-bold  mb-4">Industry</h2>
          <ul className="flex flex-col items-start">
            {industries.map((industry, index) => (
              <li key={index} className="">
                <a
                  href="#"
                  className={`block text-sm p-2  font-semibold text-gray-500 hover:text-blue-700 ${index === 0 ? "font-bold text-blue-700" : ""
                    }`}
                >
                  {industry}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      {children}
    </div>

  )
}
