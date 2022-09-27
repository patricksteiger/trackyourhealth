import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import { Instrument } from '@prisma/client';
import { PaginationInterface } from '@prisma-utils/nestjs-prisma';
import {
  ParsedQueryModel,
  RequestParser,
} from '@prisma-utils/nestjs-request-parser';
import { Endpoint, UUIDParam } from '@trackyourhealth/api/common/util';
import {
  ApiInstrumentDataService,
  CreateInstrumentDto,
  CreateInstrumentInput,
  UpdateInstrumentDto,
  UpdateInstrumentInput,
} from '@trackyourhealth/api/instrument/data';

import {
  CreateInstrumentRequest,
  UpdateInstrumentRequest,
} from './data/requests';

@Controller('instruments')
export class ApiInstrumentFeatureController {
  constructor(
    private readonly apiInstrumentDataService: ApiInstrumentDataService,
  ) {}

  @Endpoint({
    meta: {
      summary: 'Get Instruments',
      description:
        'Returns all `Instrument` items that match specific filter conditions',
    },
    request: {
      addPaginationQueryParams: true,
      addSortQueryParams: true,
    },
  })
  @Get()
  async getAllInstruments(
    @RequestParser() parsedOptions: ParsedQueryModel,
  ): Promise<PaginationInterface<Instrument>> {
    const result = await this.apiInstrumentDataService.getAll(parsedOptions);
    return result;
  }

  @Endpoint({
    meta: {
      summary: 'Get Instrument',
      description: 'Returns one `Instrument` by ID',
    },
    request: {},
  })
  @Get(':id')
  async getInstrumentById(@UUIDParam('id') id: string): Promise<Instrument> {
    const result = await this.apiInstrumentDataService.getById(id);
    return result;
  }

  @Endpoint({
    meta: {
      summary: 'Create new Instrument',
      description: 'Creates a new `Instrument`',
    },
    request: {
      model: CreateInstrumentInput,
    },
    response: {
      status: HttpStatus.CREATED,
    },
  })
  @Post()
  async createInstrument(
    @Body() input: CreateInstrumentRequest,
  ): Promise<Instrument> {
    const dto: CreateInstrumentDto = {
      name: input.data.name,
      title: input.data.title,
      description: input.data.description,
      questionnaire: input.data.questionnaire,
      evaluator: input.data.evaluator,
    };

    const result = await this.apiInstrumentDataService.createInstrument(dto);
    return result;
  }

  @Endpoint({
    meta: {
      summary: 'Update Instrument',
      description: 'Update an existing `Instrument` by ID',
    },
    request: {
      model: UpdateInstrumentInput,
    },
  })
  @Patch(':id')
  async updateInstrument(
    @UUIDParam('id') id: string,
    @Body() input: UpdateInstrumentRequest,
  ): Promise<Instrument> {
    const dto: UpdateInstrumentDto = {
      name: input.data.name,
      title: input.data.title,
      description: input.data.description,
      questionnaire: input.data.questionnaire,
      evaluator: input.data.evaluator,
    };

    const result = await this.apiInstrumentDataService.updateInstrument(
      id,
      dto,
    );
    return result;
  }

  @Endpoint({
    meta: {
      summary: 'Delete Instrument',
      description: 'Delete a `Instrument` by ID',
    },
    response: {
      status: HttpStatus.NO_CONTENT,
    },
  })
  @Delete(':id')
  async deleteInstrument(@UUIDParam('id') id: string): Promise<void> {
    await this.apiInstrumentDataService.deleteInstrument(id);
    return;
  }
}