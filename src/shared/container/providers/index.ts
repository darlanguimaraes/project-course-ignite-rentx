import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsDateProvider } from "./DateProvider/Implementations/DaysDateProvider";

container.registerSingleton<IDateProvider>("DateProvider", DayjsDateProvider);
