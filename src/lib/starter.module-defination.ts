import { ConfigurableModuleBuilder } from "@nestjs/common";
import { StarterModuleOptions } from "./starter.module.options";

export const {
    ConfigurableModuleClass: StarterModuleClass,
    MODULE_OPTIONS_TOKEN: STARTER_OPTION_TOKEN,
    OPTIONS_TYPE,
    ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<StarterModuleOptions>().build();
