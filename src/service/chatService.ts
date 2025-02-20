import { axiosInstance } from "../lib/axios";
import { v4 as uuidv4 } from "uuid"

interface ConversationParams {
  from: string;
  to: string;
  template: any;
  variables: any;
}

export async function startWhatsAppConversation({ from, to, template, variables }: ConversationParams): Promise<any> {
  try {
    const formattedVariables: Record<string, string> = variables.reduce((acc: Record<string, string>, { name, value }: any) => {
      acc[name.toLowerCase()] = value;
      return acc;
    }, {});
    const components = template.components
      .map(({ type, example, buttons }: any) => {
        if (type === "HEADER" || type === "BODY") {
          const placeholders = (example?.[`${type.toLowerCase()}_text_named_params`] || [])
            .map((param: any) => param.param_name.toLowerCase());

          const parameters = placeholders
            .map((key: any) => formattedVariables[key])
            .filter((text: any): text is string => Boolean(text))
            .map((text: any) => ({ type: "text", text }));

          return parameters.length ? { type: type.toLowerCase(), parameters } : null;
        }

        if (type === "BUTTONS" && Array.isArray(buttons)) {
          const filledButtons = buttons.map(({ type, text, example }) => {
            if (type === "URL" && Array.isArray(example)) {
              // Extract placeholders inside {{}} from the URL string
              const parameters = example
                .flatMap((url: string) => {
                  const matches = url.match(/{{(.*?)}}/g);
                  return matches ? matches.map(match => match.replace(/{{|}}/g, "").trim().toLowerCase()) : [];
                })
                .map((key: string) => formattedVariables[key])
                .filter((text: any): text is string => Boolean(text))
                .map((text: any) => ({ type: "text", text }));

              return parameters.length ? { type, text, parameters } : null;
            }
            return null;
          }).filter(Boolean);

          return filledButtons.length ? { type: "buttons", buttons: filledButtons } : null;
        }
        return null;
      })
      .filter(Boolean);

    // Ensure HEADER and BODY components are always included if applicable
    const headerExists = components.some((comp: any) => comp.type === "header");
    const bodyExists = components.some((comp: any) => comp.type === "body");

    if (!headerExists) {
      const headerVariable = variables.find((v: any) => v.type === "HEADER");
      if (headerVariable) {
        components.unshift({ type: "header", parameters: [{ type: "text", text: headerVariable.value }] });
      }
    }

    if (!bodyExists) {
      const bodyVariables = variables.filter((v: any) => v.type === "BODY");
      if (bodyVariables.length) {
        components.push({ type: "body", parameters: bodyVariables.map((v: any) => ({ type: "text", text: v.value })) });
      }
    }

    const requestData = {
      id: "msg_" + uuidv4() + `_${Date.now()}`,
      messaging_product: "whatsapp",
      from,
      to: `+${to}`,
      type: "template",
      templateName: template.name,
      components
    };

    const response = await axiosInstance.post("/api/start-conversation", requestData);
    return response.data;
  } catch (error) {
    console.error("Error starting WhatsApp conversation:");
    throw "Failed to start conversation";
  }
}


// export async function startWhatsAppConversation({ from, to, template, variables }: ConversationParams): Promise<any> {

//   try {
//     const formattedVariables: Record<string, string> = variables.reduce((acc: Record<string, string>, { name, value }: any) => {
//       acc[name.toLowerCase()] = value;
//       return acc;
//     }, {});


//     console.log(variables, "____________________________________")

//     const components = template.components
//       .map(({ type, example, buttons }: any) => {
//         if (type === "HEADER" || type === "BODY") {
//           const placeholders = (example?.[`${type.toLowerCase()}_text`] || [])
//             .flat()
//             .map((text: any) => text.match(/\{\{(.*?)\}\}/g) || [])
//             .flat()
//             .filter((match: any): match is string => Boolean(match))
//             .map((match: any) => match.replace("{{", "").replace("}}", "").trim().toLowerCase());

//           const parameters = placeholders
//             .map((key: any) => formattedVariables[key])
//             .filter((text: any): text is string => Boolean(text))
//             .map((text: any) => ({ type: "text", text }));

//           return parameters.length ? { type: type.toLowerCase(), parameters } : null;
//         }

//         if (type === "BUTTONS" && Array.isArray(buttons)) {
//           const filledButtons = buttons.map(({ type, text, example }) => {
//             const parameters = (example || [])
//               .flat()
//               .map((key: any) => formattedVariables[key.toLowerCase()])
//               .filter((text: any): text is string => Boolean(text))
//               .map((text: any) => ({ type: "text", text }));

//             return parameters.length ? { type, text, parameters } : null;
//           }).filter(Boolean);

//           return filledButtons.length ? { type: "buttons", buttons: filledButtons } : null;
//         }
//         return null;
//       })
//       .filter(Boolean);

//     // Ensure HEADER and BODY components are always included if applicable
//     const headerExists = components.some((comp: any) => comp.type === "header");
//     const bodyExists = components.some((comp: any) => comp.type === "body");

//     if (!headerExists) {
//       const headerVariable = variables.find((v: any) => v.type === "HEADER");
//       if (headerVariable) {
//         components.unshift({ type: "header", parameters: [{ type: "text", text: headerVariable.value }] });
//       }
//     }

//     if (!bodyExists) {
//       const bodyVariables = variables.filter((v: any) => v.type === "BODY");
//       if (bodyVariables.length) {
//         components.push({ type: "body", parameters: bodyVariables.map((v: any) => ({ type: "text", text: v.value })) });
//       }
//     }

//     const requestData = {
//       messaging_product: "whatsapp",
//       from,
//       to: `+${to}`,
//       type: "template",
//       templateName: template.name,
//       components
//     };

//     console.log(requestData);
//     const response = await axiosInstance.post("/api/start-conversation", requestData);
//     return response.data;
//   } catch (error) {
//     console.error("Error starting WhatsApp conversation:");
//     throw "Failed to start conversation"
//   }
// }


export async function getConversationById(id: string) {
  try {
    const response = await axiosInstance.get(`/api/conversationbyid/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting conversations");
  }
}

export async function getTeamMates() {
  try {
    const response = await axiosInstance.get("/api/teammates");
    return response.data;
  } catch (error: any) {
    console.log("Error getting team mates", error);
    return error.response.data.message;
  }
}
export async function getTeams() {
  try {
    const response = await axiosInstance.get("/teams?limit=100");
    return response.data;
  } catch (error: any) {
    console.log("Error getting teams", error);
    return error.response.data.message;
  }
}
