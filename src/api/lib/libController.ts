import { Controller, Get, Query, Route, Tags } from "tsoa";
import { BasicLibDoc, dbFindBasicLibByPath } from "../../db/lib_basic";

@Route("lib")
@Tags("Library")
export class LibController extends Controller {
  @Get("{path}")
  public async queryByPath(@Query() path: string): Promise<BasicLibDoc> {
    return dbFindBasicLibByPath(path);
  }
}
