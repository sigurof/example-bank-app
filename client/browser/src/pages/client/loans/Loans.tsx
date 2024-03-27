import {Tab} from "../Commons.tsx";
import {accounts} from "../../../api/api.ts";

export const Loans = () => {
    return (
        <div>
            <Tab title={"New application"}>
                asdflkj
            </Tab>
            <Tab title={"Applications"}>
                asdflkj
            </Tab>
            <Tab title={"Loans"}>
                {accounts.filter(it => it.type === "loan").map(loan => {
                    return (
                        <div>
                            {JSON.stringify(loan)}
                        </div>
                    )
                })}
            </Tab>

        </div>
    )
}
