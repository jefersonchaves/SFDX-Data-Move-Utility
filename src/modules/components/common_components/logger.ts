/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */



import * as path from 'path';
import * as fs from 'fs';
import { Common } from './common';
import { CONSTANTS } from './statics';
import { ITableMessage } from '../../models/common_models/helper_interfaces';
import ISfdmuCommand from '../../models/common_models/ISfdxCommand';
import { IAppLogger } from '../../app/appModels';



export enum RESOURCES {

  newLine = "newLine",
  separator = "separator",
  source = "source",
  target = "target",
  Step1 = "Step1",
  Step2 = "Step2",
  Pass1 = "Pass1",
  Pass2 = "Pass2",
  Pass3 = "Pass3",
  Pass4 = "Pass4",
  ObjectSetStarted = "ObjectSetStarted",
  csvFile = "csvFile",
  org = "org",
  sourceOrg = "sourceOrg",
  targetOrg = "targetOrg",
  scriptFile = "scriptFile",
  skipped = "skipped",
  noRecords = "noRecords",
  insert = "insert",
  update = "update",
  delete = "delete",
  personContact = "personContact",
  coreManifest = "coreManifest",
  userManifest = "userManifest",
  loaded = "loaded",
  cantLoad = "cantLoad",
  global = "global",
  canNotLoadModule = "canNotLoadModule",
  actionIsNotPermitted = "actionIsNotPermitted",

  defaultPromptOptions = "defaultPromptOptions",
  defaultPromptNopromptOption = "defaultPromptNopromptOption",
  defaultPromptSelectedOption = "defaultPromptSelectedOption",
  promptMessageFormat = "promptMessageFormat",
  enterTextPromptMessageFormat = "enterTextPromptMessageFormat",
  defaultPromptOptionFormat = "defaultPromptOptionFormat",

  loggerDateFormat = "loggerDateFormat",
  loggerInfoString = "loggerInfoString",

  loggerWarnString = "loggerWarnString",

  loggerErrorString = "loggerErrorString",

  loggerStackTraceString = "loggerStackTraceString",
  loggerTimeElapsedString = "loggerTimeElapsedString",
  loggerCommandStartedString = "loggerCommandStartedString",
  loggerCommandCompletedString = "loggerCommandCompletedString",

  fileLoggerInfoString = "fileLoggerInfoString",
  fileLoggerWarnSring = "fileLoggerWarnSring",
  fileLoggerErrorSring = "fileLoggerErrorSring",

  successfullyCompletedResult = "successfullyCompletedResult",
  commandInitializationErrorResult = "commandInitializationErrorResult",
  orgMetadataErrorResult = "orgMetadataErrorResult",

  commandExecutionErrorResult = "commandExecutionErrorResult",
  commandUnresolvableWarningResult = "commandUnresolvableWarningResult",
  commandAbortedByUserErrorResult = "commandAbortedByUserErrorResult",
  commandAbortedByAddOnErrorResult = "commandAbortedByAddOnErrorResult",
  commandAbortedByUnexpectedError = "commandAbortedByUnexpectedError",
  commandUnexpectedErrorResult = "commandUnexpectedErrorResult",


  commandInProgress = "commandInProgress",
  packageScript = "packageScript",
  pluginVersion = "pluginVersion",
  runningVersion = "runningVersion",
  runningSfdmuRunAddOnVersion = "runningSfdmuRunAddOnVersion",
  workingPathDoesNotExist = "workingPathDoesNotExist",
  packageFileDoesNotExist = "packageFileDoesNotExist",
  loadingPackageFile = "loadingPackageFile",
  objectWillBeExcluded = "objectWillBeExcluded",
  noObjectsDefinedInPackageFile = "noObjectsDefinedInPackageFile",
  invalidObjectOperation = "invalidObjectOperation",
  noUpdateableFieldsInTheSObject = "noUpdateableFieldsInTheSObject",
  scriptJSONFormatError = "scriptJSONFormatError",
  scriptJSONReadError = "scriptJSONReadError",
  scriptRunInSimulationMode = "scriptRunInSimulationMode",

  tryingToConnectCLI = "tryingToConnectCLI",
  successfullyConnected = "successfullyConnected",
  tryingToConnectCLIFailed = "tryingToConnectCLIFailed",
  sourceTargetCouldNotBeTheSame = "sourceTargetCouldNotBeTheSame",
  youCantImportAndExportIntoCSVFile = "youCantImportAndExportIntoCSVFile",
  accessToOrgExpired = "accessToOrgExpired",
  MalformedQuery = "MalformedQuery",
  MalformedDeleteQuery = "MalformedDeleteQuery",
  needBothOrgsToSupportPersonAccounts = "needBothOrgsToSupportPersonAccounts",

  gettingOrgMetadata = "gettingOrgMetadata",
  gettingMetadataForSObject = "gettingMetadataForSObject",
  noExternalKey = "noExternalKey",
  objectSourceDoesNotExist = "objectSourceDoesNotExist",
  objectTargetDoesNotExist = "objectTargetDoesNotExist",
  processingSObject = "processingSObject",
  fieldSourceDoesNtoExist = "fieldSourceDoesNtoExist",
  fieldTargetDoesNtoExist = "fieldTargetDoesNtoExist",
  missingFieldsToProcess = "missingFieldsToProcess",
  addedMissingParentLookupObject = "addedMissingParentLookupObject",
  failedToResolveExternalId = "failedToResolveExternalId",
  fieldIsNotOfPolymorphicType = "fieldIsNotOfPolymorphicType",
  fieldMissingPolymorphicDeclaration = "fieldMissingPolymorphicDeclaration",
  theExternalIdNotFoundInTheQuery = "theExternalIdNotFoundInTheQuery",

  loadingCoreAddonManifestFile = "loadingCoreAddonManifestFile",
  loadingAddon = "loadingAddon",
  missingNecessaryComponent = "missingNecessaryComponent",

  dataMigrationProcessStarted = "dataMigrationProcessStarted",
  buildingMigrationStaregy = "buildingMigrationStaregy",

  readingCsvFileError = "readingCsvFileError",
  writingCsvFileError = "writingCsvFileError",
  readingValuesMappingFile = "readingValuesMappingFile",
  readingFieldsMappingFile = "readingFieldsMappingFile",
  mappingRawCsvValues = "mappingRawCsvValues",
  mappingRawValues = "mappingRawValues",
  validatingAndFixingSourceCSVFiles = "validatingAndFixingSourceCSVFiles",
  validatingSourceCSVFilesSkipped = "validatingSourceCSVFilesSkipped",
  writingToCSV = "writingToCSV",
  noIssuesFoundDuringCSVValidation = "noIssuesFoundDuringCSVValidation",
  issuesFoundDuringCSVValidation = "issuesFoundDuringCSVValidation",
  continueTheJobPrompt = "continueTheJobPrompt",
  csvFileIsEmpty = "csvFileIsEmpty",
  columnsMissingInCSV = "columnsMissingInCSV",
  missingParentRecordForGivenLookupValue = "missingParentRecordForGivenLookupValue",
  cantUpdateChildLookupCSVColumn = "cantUpdateChildLookupCSVColumn",
  csvFilesWereUpdated = "csvFilesWereUpdated",
  validationAndFixingsourceCSVFilesCompleted = "validationAndFixingsourceCSVFilesCompleted",
  unableToDeleteTargetDirectory = "unableToDeleteTargetDirectory",
  unableToDeleteCacheDirectory = "unableToDeleteCacheDirectory",
  unableToDeleteSourceDirectory = "unableToDeleteSourceDirectory",
  productionModificationApprovalPrompt = "productionModificationApprovalPrompt",

  preparingJob = "preparingJob",
  executingJob = "executingJob",
  executionOrder = "executionOrder",
  queryingOrder = "queryingOrder",
  deletingOrder = "deletingOrder",

  unprocessedRecord = "unprocessedRecord",
  invalidRecordHashcode = "invalidRecordHashcode",
  apiOperationFailed = "apiOperationFailed",
  apiOperationProcessError = "apiOperationProcessError",
  apiOperationJobCreated = "apiOperationJobCreated",
  apiOperationBatchCreated = "apiOperationBatchCreated",
  apiOperationDataUploaded = "apiOperationDataUploaded",
  apiOperationInProgress = "apiOperationInProgress",
  apiOperationCompleted = "apiOperationCompleted",
  apiOperationWarnCompleted = "apiOperationWarnCompleted",
  apiOperationStarted = "apiOperationStarted",
  apiOperationFinished = "apiOperationFinished",
  invalidApiOperation = "invalidApiOperation",
  unexpectedApiError = "unexpectedApiError",
  simulationMode = "simulationMode",

  gettingRecordsCount = "gettingRecordsCount",
  totalRecordsAmount = "totalRecordsAmount",

  deletingTargetData = "deletingTargetData",
  deletingSourceData = "deletingSourceData",

  deletingTargetSObjectRecords = "deletingTargetSObjectRecords",
  deletingSourceSObjectRecords = "deletingSourceSObjectRecords",

  deletingNRecordsWillBeDeleted = "deletingNRecordsWillBeDeleted",
  deletingRecordsCompleted = "deletingRecordsCompleted",
  nothingToDelete = "nothingToDelete",
  nothingToDelete2 = "nothingToDelete2",

  deletingDataCompleted = "deletingDataCompleted",
  deletingDataSkipped = "deletingDataSkipped",

  mappingQuery = "mappingQuery",
  mappingSourceRecords = "mappingSourceRecords",
  mappingTargetRecords = "mappingTargetRecords",
  retrievingData = "retrievingData",
  retrievingDataCompleted = "retrievingDataCompleted",
  queryingAll = "queryingAll",
  queryingIn = "queryingIn",
  queryingIn2 = "queryingIn2",
  retrievingBinaryData = "retrievingBinaryData",
  queryingSelfReferenceRecords = "queryingSelfReferenceRecords",
  queryingFinished = "queryingFinished",
  queryingTotallyFetched = "queryingTotallyFetched",
  queryString = "queryString",
  fetchingSummary = "fetchingSummary",
  apiCallProgress = "apiCallProgress",

  updatingTarget = "updatingTarget",
  deletingTarget = "deletingTarget",
  updatePersonAccounts = "updatePersonAccounts",
  updatingTargetNRecordsWillBeUpdated = "updatingTargetNRecordsWillBeUpdated",
  updatingTargetObjectCompleted = "updatingTargetObjectCompleted",
  updatingTargetCompleted = "updatingTargetCompleted",
  writingToFile = "writingToFile",
  nothingUpdated = "nothingUpdated",
  skippedUpdatesWarning = "skippedUpdatesWarning",
  missingParentLookupsPrompt = "missingParentLookupsPrompt",
  updatingSummary = "updatingSummary",
  updatingTotallyUpdated = "updatingTotallyUpdated",

  processingAddon = "processingAddon",
  runAddonMethod = "runAddonMethod",
  nothingToProcess = "nothingToProcess",
  startAddonExecute = "startAddonExecute",
  finishAddonExecute = "finishAddonExecute",
  coreAddonMessageTemplate = "coreAddonMessageTemplate",
  runAddonMethodCompleted = "runAddonMethodCompleted",
  jobAbortedByAddon = "jobAbortedByAddon",

  writingToCacheFile = "writingToCacheFile",
  readingFromCacheFile = "readingFromCacheFile"
}

class FileLogger {

  fileName: string;
  enabled: boolean;
  resources: IResourceBundle;

  constructor(resources: IResourceBundle, filePath: string, fileName: string, enabled: boolean) {
    this.enabled = enabled;
    this.resources = resources;
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath);
    }
    this.fileName = path.join(filePath, fileName);
  }

  log(message: string, omitDate?: boolean) {
    if (this.enabled) {
      message = message || "";
      const date = !omitDate && this.resources.getMessage(RESOURCES.loggerDateFormat, [Common.formatDateTimeShort(new Date())]) || '';
      fs.appendFileSync(this.fileName, message.trim() ? this.resources.getMessage(RESOURCES.fileLoggerInfoString, [date, message]).trim() : '\n');
    }
  }

  warn(message: string, omitDate?: boolean) {
    if (this.enabled) {
      message = message || "";
      const date = !omitDate && this.resources.getMessage(RESOURCES.loggerDateFormat, [Common.formatDateTimeShort(new Date())]) || '';
      fs.appendFileSync(this.fileName, message.trim() ? this.resources.getMessage(RESOURCES.fileLoggerWarnSring, [date, message]).trim() : '\n');
    }
  }

  error(message: string, omitDate?: boolean) {
    if (this.enabled) {
      message = message || "";
      const date = !omitDate && this.resources.getMessage(RESOURCES.loggerDateFormat, [Common.formatDateTimeShort(new Date())]) || '';
      fs.appendFileSync(this.fileName, message.trim() ? this.resources.getMessage(RESOURCES.fileLoggerErrorSring, [date, message]).trim() : '\n');
    }
  }

}

export class Logger implements IAppLogger {

  private _commandFullName: string;
  private _jsonFlag: boolean;
  private _startTime: Date;
  private _fileLogger: FileLogger;
  private _noWarningsFlag: boolean;

  private _resources: IResourceBundle;
  private _commandMessages: IResourceBundle;

  private _uxLogger: IUxLogger;
  private _uxLoggerLevel: LoggerLevel;
  private _uxLoggerVerbosity: LOG_MESSAGE_VERBOSITY

  private _noPromptFlag: boolean;
  private _spinnerIsStarted = false;

  private _messageCache: string[] = [];


  constructor(
    resources: IResourceBundle,
    commandMessages: IResourceBundle,
    uxLogger: IUxLogger,
    command: ISfdmuCommand,
    logLevelFlag: string,
    rootPath: string,
    verboseFlag: boolean,
    conciseFlag: boolean,
    quietFlag: boolean,
    jsonFlag: boolean,
    noPromptFlag: boolean,
    noWarningsFlag: boolean,
    fileLogFlag: boolean) {

    this._resources = resources;
    this._commandMessages = commandMessages;
    this._uxLogger = uxLogger;

    this._jsonFlag = jsonFlag;
    this._noPromptFlag = noPromptFlag;
    this._noWarningsFlag = noWarningsFlag;

    this._startTime = new Date();

    if (quietFlag) {
      this._uxLoggerVerbosity = LOG_MESSAGE_VERBOSITY.NONE;
    } else if (conciseFlag) {
      this._uxLoggerVerbosity = LOG_MESSAGE_VERBOSITY.MINIMAL;
    } else if (verboseFlag) {
      this._uxLoggerVerbosity = LOG_MESSAGE_VERBOSITY.VERBOSE;
    } else {
      this._uxLoggerVerbosity = LOG_MESSAGE_VERBOSITY.NORMAL;
    }

    this._uxLoggerLevel = (<any>LoggerLevel)[String(logLevelFlag).toUpperCase()];

    if (this._uxLoggerLevel == LoggerLevel.DEBUG) {
      this._uxLoggerLevel = LoggerLevel.INFO;
    }

    if (this._uxLoggerLevel == LoggerLevel.FATAL) {
      this._uxLoggerLevel = LoggerLevel.ERROR;
    }

    if (command) {
      let pinfo = Common.getPluginInfo(command);
      this._commandFullName = pinfo.pluginName + ":" + pinfo.commandName;
    } else {
      this._commandFullName = "unknown";
    }

    this._fileLogger = new FileLogger(
      this._resources,
      path.join(rootPath, CONSTANTS.FILE_LOG_SUBDIRECTORY),
      `${Common.formatFileDate(new Date())}.${CONSTANTS.FILE_LOG_FILEEXTENSION}`,
      fileLogFlag
    );

    this.commandStartMessage();

  }

  async promptAsync(params: {
    message: string,
    options?: string,
    default?: string,
    nopromptDefault?: string,
    timeout?: number
  }, ...tokens: string[]
  ): Promise<string> {

    params.nopromptDefault = (typeof params.nopromptDefault == 'undefined' ? this.getResourceString(RESOURCES.defaultPromptNopromptOption) : params.nopromptDefault || "").trim();

    if (this._uxLoggerVerbosity == LOG_MESSAGE_VERBOSITY.NONE || this._noPromptFlag) {
      return params.nopromptDefault;
    }

    const date = this.getResourceString(RESOURCES.loggerDateFormat, Common.formatDateTimeShort(new Date()));

    params.options = (typeof params.options == 'undefined' ? this.getResourceString(RESOURCES.defaultPromptOptions) : params.options || "").trim();
    params.default = (typeof params.default == 'undefined' ? this.getResourceString(RESOURCES.defaultPromptSelectedOption) : params.default || "").trim();
    params.message = date + (this.getResourceString.apply(this, [params.message, ...tokens]) || "").trim();
    params.timeout = params.timeout || (params.options ? CONSTANTS.DEFAULT_USER_PROMPT_TIMEOUT_MS : CONSTANTS.DEFAULT_USER_PROMT_TEXT_ENTER_TIMEOUT_MS);

    params.message = this.getResourceString(
      params.options ? RESOURCES.promptMessageFormat : RESOURCES.enterTextPromptMessageFormat,
      params.message,
      params.options);

    const defaultOption = params.default ? this.getResourceString(RESOURCES.defaultPromptOptionFormat, params.default).trim() : undefined;
    let result = params.default;

    try {

      result = await this._uxLogger.prompt(
        params.message,
        {
          default: defaultOption,
          timeout: params.timeout
        });

      return result;

    } catch (ex) { }

    this.startSpinner()

    return result;

  }

  async yesNoPromptAsync(message: string, ...tokens: string[]): Promise<boolean> {
    return (await this.promptAsync.apply(this, [{
      message
    }, ...tokens])) != this.getResourceString(RESOURCES.defaultPromptSelectedOption);
  }

  async textPromptAsync(message: string, ...tokens: string[]): Promise<string> {
    return (await this.promptAsync.apply(this, [{
      default: "",
      options: "",
      message
    }, ...tokens]));
  }

  log(message: string | object | ITableMessage,
    type?: LOG_MESSAGE_TYPE,
    verbosity?: LOG_MESSAGE_VERBOSITY,
    ...tokens: string[]
  ): void {


    type = type || LOG_MESSAGE_TYPE.STRING;
    verbosity = typeof verbosity == 'undefined' ? LOG_MESSAGE_VERBOSITY.NORMAL : verbosity;

    if (typeof message == "undefined" || message == null) {
      return;
    }
    message = this.getResourceString.apply(this, [message, ...tokens]) || '';

    let allowWriteLogsToCache = true;
    const allowWriteLogsToSTdOut = !(this._jsonFlag && type != LOG_MESSAGE_TYPE.JSON);
    const allowWriteLogsToFile = !this._jsonFlag || (this._jsonFlag && type == LOG_MESSAGE_TYPE.JSON);
    const omitDateWhenWriteLogsToFile = this._jsonFlag && type == LOG_MESSAGE_TYPE.JSON;

    if ((this._uxLoggerVerbosity == LOG_MESSAGE_VERBOSITY.NONE
      || this._uxLoggerVerbosity < verbosity
      || type < this._uxLoggerLevel)
      && verbosity != LOG_MESSAGE_VERBOSITY.NONE
    ) {
      allowWriteLogsToCache = false;
    }


    let dateString = Common.formatDateTime(new Date());
    let logMessage: string;

    if (!message) {
      logMessage = '\n';
      allowWriteLogsToCache && allowWriteLogsToSTdOut && this._uxLogger.log('');
    } else {

      switch (type) {

        default:
          logMessage = this.getResourceString(RESOURCES.loggerInfoString, dateString, message as string);
          allowWriteLogsToCache && allowWriteLogsToSTdOut && this._uxLogger.log(logMessage);
          break;

        case LOG_MESSAGE_TYPE.ERROR:
          logMessage = this.getResourceString(RESOURCES.loggerErrorString, dateString, message as string);
          allowWriteLogsToCache && allowWriteLogsToSTdOut && this._uxLogger.log(logMessage);
          break;

        case LOG_MESSAGE_TYPE.WARN:
          logMessage = this.getResourceString(RESOURCES.loggerWarnString, dateString, message as string);
          (allowWriteLogsToCache = allowWriteLogsToCache && !this._noWarningsFlag) && allowWriteLogsToSTdOut && this._uxLogger.log(logMessage);
          break;

        case LOG_MESSAGE_TYPE.TABLE:
          logMessage = String(message);
          allowWriteLogsToCache && allowWriteLogsToSTdOut && this._uxLogger.table((message as ITableMessage).tableBody, {
            columns: (message as ITableMessage).tableColumns
          });
          break;

        case LOG_MESSAGE_TYPE.JSON:
          logMessage = JSON.stringify(message, null, 3);
          this._uxLogger.styledJSON(message);
          allowWriteLogsToCache = false;
          break;

        case LOG_MESSAGE_TYPE.OBJECT:
          logMessage = JSON.stringify(message, null, 3);
          allowWriteLogsToCache && allowWriteLogsToSTdOut && this._uxLogger.styledObject(message);
          break;

        case LOG_MESSAGE_TYPE.HEADER:
          logMessage = String(message).toUpperCase();
          allowWriteLogsToCache && allowWriteLogsToSTdOut && this._uxLogger.styledHeader(message);
          break;

      }
    }

    allowWriteLogsToFile && this._fileLogger.log(logMessage, omitDateWhenWriteLogsToFile);
    allowWriteLogsToCache && this._messageCache.push(logMessage);

  }

  infoNormal(message: string, ...tokens: string[]): void {
    this.log.apply(this, [message, LOG_MESSAGE_TYPE.STRING, LOG_MESSAGE_VERBOSITY.NORMAL, ...tokens]);
  }

  infoMinimal(message: string, ...tokens: string[]): void {
    this.log.apply(this, [message, LOG_MESSAGE_TYPE.STRING, LOG_MESSAGE_VERBOSITY.MINIMAL, ...tokens]);
  }

  infoVerbose(message: string, ...tokens: string[]): void {
    this.log.apply(this, [message, LOG_MESSAGE_TYPE.STRING, LOG_MESSAGE_VERBOSITY.VERBOSE, ...tokens]);
  }

  headerMinimal(message: string, ...tokens: string[]): void {
    this.log.apply(this, [message, LOG_MESSAGE_TYPE.HEADER, LOG_MESSAGE_VERBOSITY.MINIMAL, ...tokens]);
  }

  headerNormal(message: string, ...tokens: string[]): void {
    this.log.apply(this, [message, LOG_MESSAGE_TYPE.HEADER, LOG_MESSAGE_VERBOSITY.NORMAL, ...tokens]);
  }

  objectNormal(message: object): void {
    this.log.apply(this, [message, LOG_MESSAGE_TYPE.OBJECT, LOG_MESSAGE_VERBOSITY.NORMAL]);
  }

  objectMinimal(message: object): void {
    this.log.apply(this, [message, LOG_MESSAGE_TYPE.OBJECT, LOG_MESSAGE_VERBOSITY.MINIMAL]);
  }

  warn(message: string, ...tokens: string[]): void {
    this.log.apply(this, [message, LOG_MESSAGE_TYPE.WARN, LOG_MESSAGE_VERBOSITY.NORMAL, ...tokens]);
  }

  error(message: string, ...tokens: string[]): void {
    this.log.apply(this, [message, LOG_MESSAGE_TYPE.ERROR, LOG_MESSAGE_VERBOSITY.NORMAL, ...tokens]);
  }

  commandStartMessage(): void {
    this.startSpinner();
    this.log(
      this.getResourceString(RESOURCES.loggerCommandStartedString, this._commandFullName),
      LOG_MESSAGE_TYPE.STRING,
      LOG_MESSAGE_VERBOSITY.NORMAL
    );
  }

  commandFinishMessage(message: string | object,
    status: COMMAND_EXIT_STATUSES,
    stack?: string,
    ...tokens: string[]
  ): void {

    this.stopSpinner();

    if (typeof message == "undefined" || message == null) {
      return;
    }

    this.log('');

    let statusString = COMMAND_EXIT_STATUSES[status].toString();
    let endTime = new Date();
    let timeElapsedString = Common.timeDiffString(this._startTime, endTime);

    if (this._jsonFlag) {
      // Summarized command result as JSON to stdout
      this.log({
        command: this._commandFullName,
        cliCommandString: Common.getFullCommandLine(),
        endTime: Common.convertUTCDateToLocalDate(endTime),
        endTimeUTC: endTime,
        message: message,
        fullLog: this._messageCache,
        stack: stack,
        startTime: Common.convertUTCDateToLocalDate(this._startTime),
        startTimeUTC: this._startTime,
        status: status,
        statusString: statusString,
        timeElapsedString: timeElapsedString
      } as IFinishMessage,
        LOG_MESSAGE_TYPE.JSON,
        LOG_MESSAGE_VERBOSITY.NONE,
        ...tokens);

    } else {

      // Command result as string to stdout
      this.log(String(message),
        LOG_MESSAGE_TYPE.STRING,
        LOG_MESSAGE_VERBOSITY.NONE,
        ...tokens);

      // "Command finished" as string to stdout
      this.log(
        this.getResourceString(
          RESOURCES.loggerCommandCompletedString,
          this._commandFullName,
          String(status),
          statusString),
        status == COMMAND_EXIT_STATUSES.SUCCESS ? LOG_MESSAGE_TYPE.STRING : LOG_MESSAGE_TYPE.ERROR,
        LOG_MESSAGE_VERBOSITY.NONE
      );

      // "Time elapsed" as string to stdout
      this.log(
        this.getResourceString(
          RESOURCES.loggerTimeElapsedString,
          timeElapsedString),
        LOG_MESSAGE_TYPE.STRING,
        LOG_MESSAGE_VERBOSITY.NONE
      );

    }
  }


  spinner(message?: string, ...tokens: string[]): void {
    message = this.getResourceString.apply(this, [message, ...tokens]);
    if (!message) {
      this._spinnerIsStarted = false;
      this._uxLogger.stopSpinner();
    } else if (!this._spinnerIsStarted) {
      this._uxLogger.startSpinner(message);
      this._spinnerIsStarted = true;
    } else {
      this._uxLogger.setSpinnerStatus(message);
    }
  }

  startSpinner() {
    if ((this._uxLoggerVerbosity == LOG_MESSAGE_VERBOSITY.NONE
      || this._uxLoggerLevel != LoggerLevel.INFO)
      && !this._jsonFlag) {
      this.spinner(RESOURCES.commandInProgress);
    }
  }

  stopSpinner() {
    this.spinner();
  }

  getResourceString(message: any, ...tokens: string[]): any {
    if (!message || typeof message != "string") return message;
    try {
      let mes = this._resources.getMessage(String(message), tokens);
      return mes;
    } catch (ex) {
      try {
        let mes = this._commandMessages.getMessage(String(message), tokens);
        return mes;
      } catch (ex) {
        return message;
      }
    }
  }

  getStartTime(): Date {
    return this._startTime;
  }

}

export enum LOG_MESSAGE_TYPE {
  STRING = 30,
  ERROR = 50,
  WARN = 40,
  TABLE = 31,
  JSON = 32,
  OBJECT = 33,
  HEADER = 34
}

export enum LOG_MESSAGE_VERBOSITY {
  NONE = 0,
  MINIMAL = 1,
  NORMAL = 2,
  VERBOSE = 3
}

export enum LoggerLevel {
  TRACE = 10,
  DEBUG = 20,
  INFO = 30,
  WARN = 40,
  ERROR = 50,
  FATAL = 60
}
export interface IUxLogger {
  log: Function,
  styledJSON: Function,
  warn: Function,
  error: Function,
  styledObject: Function,
  table: Function,
  prompt: Function,
  styledHeader: Function,
  startSpinner: Function,
  stopSpinner: Function,
  setSpinnerStatus: Function
}

export declare type Tokens = Array<string | boolean | number | null | undefined>;
export interface IMessages {
  getMessage(key: string, tokens?: Tokens): string;
}
export interface IResourceBundle {
  getMessage(key: string, tokens?: any): string;
}


export interface IFinishMessage {
  command: string,
  cliCommandString: string,
  message: string,
  fullLog: string[],
  stack: string,
  status: number,
  statusString: string,
  startTime: Date,
  startTimeUTC: Date,
  endTime: Date,
  endTimeUTC: Date,
  timeElapsedString: string
}

export enum COMMAND_EXIT_STATUSES {
  SUCCESS = 0,
  COMMAND_UNEXPECTED_ERROR = 1,
  COMMAND_INITIALIZATION_ERROR = 2,
  ORG_METADATA_ERROR = 3,
  COMMAND_EXECUTION_ERROR = 4,
  COMMAND_ABORTED_BY_USER = 5,
  UNRESOLWABLE_WARNING = 6,
  COMMAND_ABORTED_BY_ADDON = 7,
}











