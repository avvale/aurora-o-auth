
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum OAuthClientGrantType {
    AUTHORIZATION_CODE = "AUTHORIZATION_CODE",
    CLIENT_CREDENTIALS = "CLIENT_CREDENTIALS",
    PASSWORD = "PASSWORD"
}

export interface OAuthCreateAccessTokenInput {
    id: string;
    clientId: string;
    accountId?: Nullable<string>;
    token: GraphQLString;
    name?: Nullable<GraphQLString>;
    isRevoked: GraphQLBoolean;
    expiresAt?: Nullable<GraphQLTimestamp>;
    refreshToken?: Nullable<OAuthCreateRefreshTokenInput>;
}

export interface OAuthUpdateAccessTokenInput {
    id: string;
    clientId?: Nullable<string>;
    accountId?: Nullable<string>;
    token?: Nullable<GraphQLString>;
    name?: Nullable<GraphQLString>;
    isRevoked?: Nullable<GraphQLBoolean>;
    expiresAt?: Nullable<GraphQLTimestamp>;
    refreshToken?: Nullable<OAuthUpdateRefreshTokenInput>;
}

export interface OAuthCreateApplicationInput {
    id: string;
    name: GraphQLString;
    code: GraphQLString;
    secret: GraphQLString;
    isMaster: GraphQLBoolean;
    clientIds?: Nullable<Nullable<string>[]>;
}

export interface OAuthUpdateApplicationInput {
    id: string;
    name?: Nullable<GraphQLString>;
    code?: Nullable<GraphQLString>;
    secret?: Nullable<GraphQLString>;
    isMaster?: Nullable<GraphQLBoolean>;
    clientIds?: Nullable<Nullable<string>[]>;
}

export interface OAuthCreateClientInput {
    id: string;
    grantType: OAuthClientGrantType;
    name: GraphQLString;
    secret: GraphQLString;
    authUrl?: Nullable<GraphQLString>;
    redirect?: Nullable<GraphQLString>;
    expiredAccessToken?: Nullable<GraphQLInt>;
    expiredRefreshToken?: Nullable<GraphQLInt>;
    isActive: GraphQLBoolean;
    isMaster: GraphQLBoolean;
    applicationIds?: Nullable<Nullable<string>[]>;
}

export interface OAuthUpdateClientInput {
    id: string;
    grantType?: Nullable<OAuthClientGrantType>;
    name?: Nullable<GraphQLString>;
    secret?: Nullable<GraphQLString>;
    authUrl?: Nullable<GraphQLString>;
    redirect?: Nullable<GraphQLString>;
    expiredAccessToken?: Nullable<GraphQLInt>;
    expiredRefreshToken?: Nullable<GraphQLInt>;
    isActive?: Nullable<GraphQLBoolean>;
    isMaster?: Nullable<GraphQLBoolean>;
    applicationIds?: Nullable<Nullable<string>[]>;
}

export interface OAuthCreateCredentialInput {
    grantType: OAuthClientGrantType;
    username?: Nullable<GraphQLString>;
    password?: Nullable<GraphQLString>;
    email?: Nullable<GraphQLString>;
    clientSecret?: Nullable<GraphQLString>;
    accessTokenId?: Nullable<string>;
    refreshToken?: Nullable<GraphQLString>;
    redirect?: Nullable<GraphQLString>;
}

export interface OAuthCreateRefreshTokenInput {
    id: string;
    accessTokenId: string;
    token: GraphQLString;
    isRevoked: GraphQLBoolean;
    expiresAt?: Nullable<GraphQLTimestamp>;
}

export interface OAuthUpdateRefreshTokenInput {
    id: string;
    accessTokenId?: Nullable<string>;
    token?: Nullable<GraphQLString>;
    isRevoked?: Nullable<GraphQLBoolean>;
    expiresAt?: Nullable<GraphQLTimestamp>;
}

export interface QueryStatement {
    where?: Nullable<JSON>;
    include?: Nullable<Nullable<GraphQLString>[]>;
    order?: Nullable<JSON>;
    limit?: Nullable<GraphQLInt>;
    offset?: Nullable<GraphQLInt>;
}

export interface OAuthAccessToken {
    id: string;
    clientId: string;
    client?: Nullable<OAuthClient>;
    accountId?: Nullable<string>;
    token: GraphQLString;
    name?: Nullable<GraphQLString>;
    isRevoked: GraphQLBoolean;
    expiresAt?: Nullable<GraphQLTimestamp>;
    refreshToken?: Nullable<OAuthRefreshToken>;
    createdAt?: Nullable<GraphQLTimestamp>;
    updatedAt?: Nullable<GraphQLTimestamp>;
    deletedAt?: Nullable<GraphQLTimestamp>;
}

export interface IQuery {
    oAuthFindAccessToken(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<OAuthAccessToken> | Promise<Nullable<OAuthAccessToken>>;
    oAuthFindAccessTokenById(id?: Nullable<string>, constraint?: Nullable<QueryStatement>): Nullable<OAuthAccessToken> | Promise<Nullable<OAuthAccessToken>>;
    oAuthGetAccessTokens(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<OAuthAccessToken>[] | Promise<Nullable<OAuthAccessToken>[]>;
    oAuthPaginateAccessTokens(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Pagination | Promise<Pagination>;
    oAuthFindApplication(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<OAuthApplication> | Promise<Nullable<OAuthApplication>>;
    oAuthFindApplicationById(id?: Nullable<string>, constraint?: Nullable<QueryStatement>): Nullable<OAuthApplication> | Promise<Nullable<OAuthApplication>>;
    oAuthGetApplications(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<OAuthApplication>[] | Promise<Nullable<OAuthApplication>[]>;
    oAuthPaginateApplications(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Pagination | Promise<Pagination>;
    oAuthFindClient(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<OAuthClient> | Promise<Nullable<OAuthClient>>;
    oAuthFindClientById(id?: Nullable<string>, constraint?: Nullable<QueryStatement>): Nullable<OAuthClient> | Promise<Nullable<OAuthClient>>;
    oAuthGetClients(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<OAuthClient>[] | Promise<Nullable<OAuthClient>[]>;
    oAuthPaginateClients(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Pagination | Promise<Pagination>;
    oAuthFindRefreshToken(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<OAuthRefreshToken> | Promise<Nullable<OAuthRefreshToken>>;
    oAuthFindRefreshTokenById(id?: Nullable<string>, constraint?: Nullable<QueryStatement>): Nullable<OAuthRefreshToken> | Promise<Nullable<OAuthRefreshToken>>;
    oAuthGetRefreshTokens(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<OAuthRefreshToken>[] | Promise<Nullable<OAuthRefreshToken>[]>;
    oAuthPaginateRefreshTokens(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Pagination | Promise<Pagination>;
    hello(): Nullable<string> | Promise<Nullable<string>>;
}

export interface IMutation {
    oAuthCreateAccessToken(payload: OAuthCreateAccessTokenInput): Nullable<OAuthAccessToken> | Promise<Nullable<OAuthAccessToken>>;
    oAuthCreateAccessTokens(payload: Nullable<OAuthCreateAccessTokenInput>[]): boolean | Promise<boolean>;
    oAuthUpdateAccessToken(payload: OAuthUpdateAccessTokenInput, constraint?: Nullable<QueryStatement>): Nullable<OAuthAccessToken> | Promise<Nullable<OAuthAccessToken>>;
    oAuthDeleteAccessTokenById(id: string, constraint?: Nullable<QueryStatement>): Nullable<OAuthAccessToken> | Promise<Nullable<OAuthAccessToken>>;
    oAuthDeleteAccessTokens(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<OAuthAccessToken>[] | Promise<Nullable<OAuthAccessToken>[]>;
    oAuthCreateApplication(payload: OAuthCreateApplicationInput): Nullable<OAuthApplication> | Promise<Nullable<OAuthApplication>>;
    oAuthCreateApplications(payload: Nullable<OAuthCreateApplicationInput>[]): boolean | Promise<boolean>;
    oAuthUpdateApplication(payload: OAuthUpdateApplicationInput, constraint?: Nullable<QueryStatement>): Nullable<OAuthApplication> | Promise<Nullable<OAuthApplication>>;
    oAuthDeleteApplicationById(id: string, constraint?: Nullable<QueryStatement>): Nullable<OAuthApplication> | Promise<Nullable<OAuthApplication>>;
    oAuthDeleteApplications(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<OAuthApplication>[] | Promise<Nullable<OAuthApplication>[]>;
    oAuthCreateClient(payload: OAuthCreateClientInput): Nullable<OAuthClient> | Promise<Nullable<OAuthClient>>;
    oAuthCreateClients(payload: Nullable<OAuthCreateClientInput>[]): boolean | Promise<boolean>;
    oAuthUpdateClient(payload: OAuthUpdateClientInput, constraint?: Nullable<QueryStatement>): Nullable<OAuthClient> | Promise<Nullable<OAuthClient>>;
    oAuthDeleteClientById(id: string, constraint?: Nullable<QueryStatement>): Nullable<OAuthClient> | Promise<Nullable<OAuthClient>>;
    oAuthDeleteClients(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<OAuthClient>[] | Promise<Nullable<OAuthClient>[]>;
    oAuthCreateCredential(payload: OAuthCreateCredentialInput): OAuthCredential | Promise<OAuthCredential>;
    oAuthCreateRefreshToken(payload: OAuthCreateRefreshTokenInput): Nullable<OAuthRefreshToken> | Promise<Nullable<OAuthRefreshToken>>;
    oAuthCreateRefreshTokens(payload: Nullable<OAuthCreateRefreshTokenInput>[]): boolean | Promise<boolean>;
    oAuthUpdateRefreshToken(payload: OAuthUpdateRefreshTokenInput, constraint?: Nullable<QueryStatement>): Nullable<OAuthRefreshToken> | Promise<Nullable<OAuthRefreshToken>>;
    oAuthDeleteRefreshTokenById(id: string, constraint?: Nullable<QueryStatement>): Nullable<OAuthRefreshToken> | Promise<Nullable<OAuthRefreshToken>>;
    oAuthDeleteRefreshTokens(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<OAuthRefreshToken>[] | Promise<Nullable<OAuthRefreshToken>[]>;
}

export interface OAuthApplication {
    id: string;
    name: GraphQLString;
    code: GraphQLString;
    secret: GraphQLString;
    isMaster: GraphQLBoolean;
    clients?: Nullable<Nullable<OAuthClient>[]>;
    createdAt?: Nullable<GraphQLTimestamp>;
    updatedAt?: Nullable<GraphQLTimestamp>;
    deletedAt?: Nullable<GraphQLTimestamp>;
}

export interface OAuthClient {
    id: string;
    grantType: OAuthClientGrantType;
    name: GraphQLString;
    secret: GraphQLString;
    authUrl?: Nullable<GraphQLString>;
    redirect?: Nullable<GraphQLString>;
    expiredAccessToken?: Nullable<GraphQLInt>;
    expiredRefreshToken?: Nullable<GraphQLInt>;
    isActive: GraphQLBoolean;
    isMaster: GraphQLBoolean;
    applications?: Nullable<Nullable<OAuthApplication>[]>;
    accessTokens?: Nullable<Nullable<OAuthAccessToken>[]>;
    createdAt?: Nullable<GraphQLTimestamp>;
    updatedAt?: Nullable<GraphQLTimestamp>;
    deletedAt?: Nullable<GraphQLTimestamp>;
}

export interface OAuthCredential {
    accessToken: GraphQLString;
    refreshToken: GraphQLString;
}

export interface OAuthRefreshToken {
    id: string;
    accessTokenId: string;
    accessToken?: Nullable<OAuthAccessToken>;
    token: GraphQLString;
    isRevoked: GraphQLBoolean;
    expiresAt?: Nullable<GraphQLTimestamp>;
    createdAt?: Nullable<GraphQLTimestamp>;
    updatedAt?: Nullable<GraphQLTimestamp>;
    deletedAt?: Nullable<GraphQLTimestamp>;
}

export interface Pagination {
    total: GraphQLInt;
    count: GraphQLInt;
    rows: Nullable<JSON>[];
}

export type JSON = any;
export type Any = any;
export type Upload = any;
export type GraphQLString = any;
export type GraphQLInt = any;
export type GraphQLFloat = any;
export type GraphQLBoolean = any;
export type GraphQLISODateTime = any;
export type GraphQLTimestamp = any;
export type GraphQLUpload = any;
type Nullable<T> = T | null;
