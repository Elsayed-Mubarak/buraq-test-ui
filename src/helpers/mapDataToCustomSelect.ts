import { ISelectITem } from "@/types/selectItem";

export function mapDataToCustomSelect(data: any[], byId?: boolean): ISelectITem[] {
    const modifiedData = data.map((item, idx: number) => ({
        id: item?._id || item?.id || idx,
        name: item?.name || item?.variableName || "",
        value: byId ? item?.id || item?._id : item?.value || item?.format || item?.name || "",
    }));

    return modifiedData;
}
