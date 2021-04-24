import {
  Controller,
  Get,
  Post,
  Query,
  Route,
  Tags,
  Request,
  ValidateError,
  SuccessResponse,
  Response,
  Body,
} from "tsoa";
import express from "express";
import { dbFindBasicLibByPath } from "../../db/lib_basic";
import multer from "multer";

export interface ErrorResponseJSON {
  message: "Validation failed";
  details: { [name: string]: unknown };
}

@Tags("Library")
@Route("lib")
export class LibController extends Controller {
  @Response<ErrorResponseJSON>(422, "error of 422")
  @Response<ErrorResponseJSON>(500, "error of 500")
  @Get("{path}")
  public async queryByPath(@Query() path: string): Promise<any> {
    return dbFindBasicLibByPath(path);
  }

  @SuccessResponse(201, "Created")
  @Post()
  public async uploadImg(
    @Request() request: express.Request,
    @Body() files: any
  ): Promise<any> {
    await this.handleUpload(request);
    return {};
  }

  private handleUpload(request: express.Request): Promise<any> {
    const multiSingle = multer().single("randomFileIsHere");

    return new Promise((resolve, reject) => {
      // @ts-ignore
      multiSingle(request, undefined, async (error: any) => {
        if (error) {
          reject(error);
        } else {
          resolve("xx");
        }
      });
    });
  }
}
