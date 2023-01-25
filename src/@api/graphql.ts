
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum IamAccountType {
    USER = "USER",
    SERVICE = "SERVICE"
}

export enum OAuthClientGrantType {
    AUTHORIZATION_CODE = "AUTHORIZATION_CODE",
    CLIENT_CREDENTIALS = "CLIENT_CREDENTIALS",
    PASSWORD = "PASSWORD",
    REFRESH_TOKEN = "REFRESH_TOKEN"
}

export interface IamCreateAccountInput {
    id: string;
    type: IamAccountType;
    code?: Nullable<GraphQLString>;
    email: GraphQLString;
    isActive: GraphQLBoolean;
    clientId: string;
    scopes?: Nullable<JSON>;
    meta?: Nullable<JSON>;
    roleIds?: Nullable<Nullable<string>[]>;
    tenantIds?: Nullable<Nullable<string>[]>;
    user?: Nullable<IamCreateUserInput>;
}

export interface IamUpdateAccountByIdInput {
    id: string;
    type?: Nullable<IamAccountType>;
    code?: Nullable<GraphQLString>;
    email?: Nullable<GraphQLString>;
    isActive?: Nullable<GraphQLBoolean>;
    clientId?: Nullable<string>;
    scopes?: Nullable<JSON>;
    meta?: Nullable<JSON>;
    roleIds?: Nullable<Nullable<string>[]>;
    tenantIds?: Nullable<Nullable<string>[]>;
    user?: Nullable<IamUpdateUserByIdInput>;
}

export interface IamUpdateAccountsInput {
    id?: Nullable<string>;
    type?: Nullable<IamAccountType>;
    code?: Nullable<GraphQLString>;
    email?: Nullable<GraphQLString>;
    isActive?: Nullable<GraphQLBoolean>;
    clientId?: Nullable<string>;
    scopes?: Nullable<JSON>;
    dApplicationCodes?: Nullable<JSON>;
    dPermissions?: Nullable<JSON>;
    meta?: Nullable<JSON>;
    roleIds?: Nullable<Nullable<string>[]>;
    tenantIds?: Nullable<Nullable<string>[]>;
    user?: Nullable<IamUpdateUsersInput>;
}

export interface IamCreateBoundedContextInput {
    id: string;
    name: GraphQLString;
    root: GraphQLString;
    sort?: Nullable<GraphQLInt>;
    isActive: GraphQLBoolean;
}

export interface IamUpdateBoundedContextByIdInput {
    id: string;
    name?: Nullable<GraphQLString>;
    root?: Nullable<GraphQLString>;
    sort?: Nullable<GraphQLInt>;
    isActive?: Nullable<GraphQLBoolean>;
}

export interface IamUpdateBoundedContextsInput {
    id?: Nullable<string>;
    name?: Nullable<GraphQLString>;
    root?: Nullable<GraphQLString>;
    sort?: Nullable<GraphQLInt>;
    isActive?: Nullable<GraphQLBoolean>;
}

export interface IamCreatePermissionRoleInput {
    permissionId: string;
    roleId: string;
}

export interface IamDeletePermissionRoleInput {
    permissionId: string;
    roleId: string;
}

export interface IamCreatePermissionInput {
    id: string;
    name: GraphQLString;
    boundedContextId: string;
    roleIds?: Nullable<Nullable<string>[]>;
}

export interface IamUpdatePermissionByIdInput {
    id: string;
    name?: Nullable<GraphQLString>;
    boundedContextId?: Nullable<string>;
    roleIds?: Nullable<Nullable<string>[]>;
}

export interface IamUpdatePermissionsInput {
    id?: Nullable<string>;
    name?: Nullable<GraphQLString>;
    boundedContextId?: Nullable<string>;
    roleIds?: Nullable<Nullable<string>[]>;
}

export interface IamCreateRoleInput {
    id: string;
    name: GraphQLString;
    isMaster: GraphQLBoolean;
    permissionIds?: Nullable<Nullable<string>[]>;
    accountIds?: Nullable<Nullable<string>[]>;
}

export interface IamUpdateRoleByIdInput {
    id: string;
    name?: Nullable<GraphQLString>;
    isMaster?: Nullable<GraphQLBoolean>;
    permissionIds?: Nullable<Nullable<string>[]>;
    accountIds?: Nullable<Nullable<string>[]>;
}

export interface IamUpdateRolesInput {
    id?: Nullable<string>;
    name?: Nullable<GraphQLString>;
    isMaster?: Nullable<GraphQLBoolean>;
    permissionIds?: Nullable<Nullable<string>[]>;
    accountIds?: Nullable<Nullable<string>[]>;
}

export interface IamCreateTenantInput {
    id: string;
    name: GraphQLString;
    code?: Nullable<GraphQLString>;
    logo?: Nullable<GraphQLString>;
    isActive: GraphQLBoolean;
    accountIds?: Nullable<Nullable<string>[]>;
}

export interface IamUpdateTenantByIdInput {
    id: string;
    name?: Nullable<GraphQLString>;
    code?: Nullable<GraphQLString>;
    logo?: Nullable<GraphQLString>;
    isActive?: Nullable<GraphQLBoolean>;
    accountIds?: Nullable<Nullable<string>[]>;
}

export interface IamUpdateTenantsInput {
    id?: Nullable<string>;
    name?: Nullable<GraphQLString>;
    code?: Nullable<GraphQLString>;
    logo?: Nullable<GraphQLString>;
    isActive?: Nullable<GraphQLBoolean>;
    accountIds?: Nullable<Nullable<string>[]>;
}

export interface IamUpdateUserMetaByIdInput {
    meta?: Nullable<JSON>;
}

export interface IamCreateUserInput {
    id: string;
    name: GraphQLString;
    surname?: Nullable<GraphQLString>;
    avatar?: Nullable<GraphQLString>;
    mobile?: Nullable<GraphQLString>;
    langId?: Nullable<string>;
    username: GraphQLString;
    password: GraphQLString;
    rememberToken?: Nullable<GraphQLString>;
    accountId: string;
    meta?: Nullable<JSON>;
}

export interface IamUpdateUserByIdInput {
    id: string;
    name?: Nullable<GraphQLString>;
    surname?: Nullable<GraphQLString>;
    avatar?: Nullable<GraphQLString>;
    mobile?: Nullable<GraphQLString>;
    langId?: Nullable<string>;
    username?: Nullable<GraphQLString>;
    password?: Nullable<GraphQLString>;
    rememberToken?: Nullable<GraphQLString>;
    accountId?: Nullable<string>;
    meta?: Nullable<JSON>;
}

export interface IamUpdateUsersInput {
    id?: Nullable<string>;
    name?: Nullable<GraphQLString>;
    surname?: Nullable<GraphQLString>;
    avatar?: Nullable<GraphQLString>;
    mobile?: Nullable<GraphQLString>;
    langId?: Nullable<string>;
    username?: Nullable<GraphQLString>;
    password?: Nullable<GraphQLString>;
    rememberToken?: Nullable<GraphQLString>;
    accountId?: Nullable<string>;
    meta?: Nullable<JSON>;
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

export interface OAuthUpdateAccessTokenByIdInput {
    id: string;
    clientId?: Nullable<string>;
    accountId?: Nullable<string>;
    token?: Nullable<GraphQLString>;
    name?: Nullable<GraphQLString>;
    isRevoked?: Nullable<GraphQLBoolean>;
    expiresAt?: Nullable<GraphQLTimestamp>;
    refreshToken?: Nullable<OAuthUpdateRefreshTokenByIdInput>;
}

export interface OAuthUpdateAccessTokensInput {
    id?: Nullable<string>;
    clientId?: Nullable<string>;
    accountId?: Nullable<string>;
    token?: Nullable<GraphQLString>;
    name?: Nullable<GraphQLString>;
    isRevoked?: Nullable<GraphQLBoolean>;
    expiresAt?: Nullable<GraphQLTimestamp>;
    refreshToken?: Nullable<OAuthUpdateRefreshTokensInput>;
}

export interface OAuthCreateApplicationInput {
    id: string;
    code: GraphQLString;
    name: GraphQLString;
    secret: GraphQLString;
    isMaster: GraphQLBoolean;
    clientIds?: Nullable<Nullable<string>[]>;
}

export interface OAuthUpdateApplicationByIdInput {
    id: string;
    code?: Nullable<GraphQLString>;
    name?: Nullable<GraphQLString>;
    secret?: Nullable<GraphQLString>;
    isMaster?: Nullable<GraphQLBoolean>;
    clientIds?: Nullable<Nullable<string>[]>;
}

export interface OAuthUpdateApplicationsInput {
    id?: Nullable<string>;
    code?: Nullable<GraphQLString>;
    name?: Nullable<GraphQLString>;
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
    scopeOptions?: Nullable<JSON>;
    expiredAccessToken?: Nullable<GraphQLInt>;
    expiredRefreshToken?: Nullable<GraphQLInt>;
    isActive: GraphQLBoolean;
    isMaster: GraphQLBoolean;
    applicationIds?: Nullable<Nullable<string>[]>;
}

export interface OAuthUpdateClientByIdInput {
    id: string;
    grantType?: Nullable<OAuthClientGrantType>;
    name?: Nullable<GraphQLString>;
    secret?: Nullable<GraphQLString>;
    authUrl?: Nullable<GraphQLString>;
    redirect?: Nullable<GraphQLString>;
    scopeOptions?: Nullable<JSON>;
    expiredAccessToken?: Nullable<GraphQLInt>;
    expiredRefreshToken?: Nullable<GraphQLInt>;
    isActive?: Nullable<GraphQLBoolean>;
    isMaster?: Nullable<GraphQLBoolean>;
    applicationIds?: Nullable<Nullable<string>[]>;
}

export interface OAuthUpdateClientsInput {
    id?: Nullable<string>;
    grantType?: Nullable<OAuthClientGrantType>;
    name?: Nullable<GraphQLString>;
    secret?: Nullable<GraphQLString>;
    authUrl?: Nullable<GraphQLString>;
    redirect?: Nullable<GraphQLString>;
    scopeOptions?: Nullable<JSON>;
    expiredAccessToken?: Nullable<GraphQLInt>;
    expiredRefreshToken?: Nullable<GraphQLInt>;
    isActive?: Nullable<GraphQLBoolean>;
    isMaster?: Nullable<GraphQLBoolean>;
    applicationIds?: Nullable<Nullable<string>[]>;
}

export interface OAuthCreateCredentialsInput {
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

export interface OAuthUpdateRefreshTokenByIdInput {
    id: string;
    accessTokenId?: Nullable<string>;
    token?: Nullable<GraphQLString>;
    isRevoked?: Nullable<GraphQLBoolean>;
    expiresAt?: Nullable<GraphQLTimestamp>;
}

export interface OAuthUpdateRefreshTokensInput {
    id?: Nullable<string>;
    accessTokenId?: Nullable<string>;
    token?: Nullable<GraphQLString>;
    isRevoked?: Nullable<GraphQLBoolean>;
    expiresAt?: Nullable<GraphQLTimestamp>;
}

export interface OAuthCreateScopeInput {
    id: string;
    code: GraphQLString;
    name: GraphQLString;
}

export interface OAuthUpdateScopeByIdInput {
    id: string;
    code?: Nullable<GraphQLString>;
    name?: Nullable<GraphQLString>;
}

export interface OAuthUpdateScopesInput {
    id?: Nullable<string>;
    code?: Nullable<GraphQLString>;
    name?: Nullable<GraphQLString>;
}

export interface QueryStatement {
    where?: Nullable<JSON>;
    attributes?: Nullable<JSON>;
    include?: Nullable<Nullable<GraphQLString>[]>;
    order?: Nullable<JSON>;
    group?: Nullable<JSON>;
    limit?: Nullable<GraphQLInt>;
    offset?: Nullable<GraphQLInt>;
    distinct?: Nullable<GraphQLBoolean>;
    col?: Nullable<GraphQLString>;
}

export interface IamAccount {
    id: string;
    type: IamAccountType;
    code?: Nullable<GraphQLString>;
    email: GraphQLString;
    isActive: GraphQLBoolean;
    clientId: string;
    client?: Nullable<OAuthClient>;
    scopes?: Nullable<JSON>;
    dApplicationCodes: JSON;
    dPermissions: JSON;
    dTenants: JSON;
    meta?: Nullable<JSON>;
    roles?: Nullable<Nullable<IamRole>[]>;
    tenants?: Nullable<Nullable<IamTenant>[]>;
    user?: Nullable<IamUser>;
    createdAt?: Nullable<GraphQLTimestamp>;
    updatedAt?: Nullable<GraphQLTimestamp>;
    deletedAt?: Nullable<GraphQLTimestamp>;
}

export interface IQuery {
    iamFindAccount(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<IamAccount> | Promise<Nullable<IamAccount>>;
    iamFindAccountById(id?: Nullable<string>, constraint?: Nullable<QueryStatement>, queryGetClients?: Nullable<QueryStatement>, constraintGetClients?: Nullable<QueryStatement>): Nullable<IamAccount> | Promise<Nullable<IamAccount>>;
    iamGetAccounts(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<IamAccount>[] | Promise<Nullable<IamAccount>[]>;
    iamPaginateAccounts(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Pagination | Promise<Pagination>;
    iamMeAccount(): Nullable<IamAccount> | Promise<Nullable<IamAccount>>;
    iamFindBoundedContext(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<IamBoundedContext> | Promise<Nullable<IamBoundedContext>>;
    iamFindBoundedContextById(id?: Nullable<string>, constraint?: Nullable<QueryStatement>): Nullable<IamBoundedContext> | Promise<Nullable<IamBoundedContext>>;
    iamGetBoundedContexts(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<IamBoundedContext>[] | Promise<Nullable<IamBoundedContext>[]>;
    iamPaginateBoundedContexts(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Pagination | Promise<Pagination>;
    iamFindPermissionRoleById(permissionId?: Nullable<string>, roleId?: Nullable<string>, constraint?: Nullable<QueryStatement>): Nullable<IamPermissionRole> | Promise<Nullable<IamPermissionRole>>;
    iamGetPermissionsRoles(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<IamPermissionRole>[] | Promise<Nullable<IamPermissionRole>[]>;
    iamPaginatePermissionsRoles(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Pagination | Promise<Pagination>;
    iamFindPermission(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<IamPermission> | Promise<Nullable<IamPermission>>;
    iamFindPermissionById(id?: Nullable<string>, constraint?: Nullable<QueryStatement>): Nullable<IamPermission> | Promise<Nullable<IamPermission>>;
    iamGetPermissions(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<IamPermission>[] | Promise<Nullable<IamPermission>[]>;
    iamPaginatePermissions(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Pagination | Promise<Pagination>;
    iamFindRole(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<IamRole> | Promise<Nullable<IamRole>>;
    iamFindRoleById(id?: Nullable<string>, constraint?: Nullable<QueryStatement>): Nullable<IamRole> | Promise<Nullable<IamRole>>;
    iamGetRoles(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<IamRole>[] | Promise<Nullable<IamRole>[]>;
    iamPaginateRoles(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Pagination | Promise<Pagination>;
    iamFindTenant(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<IamTenant> | Promise<Nullable<IamTenant>>;
    iamFindTenantById(id?: Nullable<string>, constraint?: Nullable<QueryStatement>): Nullable<IamTenant> | Promise<Nullable<IamTenant>>;
    iamGetTenants(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<IamTenant>[] | Promise<Nullable<IamTenant>[]>;
    iamPaginateTenants(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Pagination | Promise<Pagination>;
    iamFindUserMetaById(id: string): Nullable<IamUserMeta> | Promise<Nullable<IamUserMeta>>;
    iamFindUser(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<IamUser> | Promise<Nullable<IamUser>>;
    iamFindUserById(id?: Nullable<string>, constraint?: Nullable<QueryStatement>): Nullable<IamUser> | Promise<Nullable<IamUser>>;
    iamGetUsers(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<IamUser>[] | Promise<Nullable<IamUser>[]>;
    iamPaginateUsers(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Pagination | Promise<Pagination>;
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
    oAuthFindScope(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<OAuthScope> | Promise<Nullable<OAuthScope>>;
    oAuthFindScopeById(id?: Nullable<string>, constraint?: Nullable<QueryStatement>): Nullable<OAuthScope> | Promise<Nullable<OAuthScope>>;
    oAuthGetScopes(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<OAuthScope>[] | Promise<Nullable<OAuthScope>[]>;
    oAuthPaginateScopes(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Pagination | Promise<Pagination>;
    hello(): Nullable<string> | Promise<Nullable<string>>;
}

export interface IMutation {
    iamCreateAccount(payload: IamCreateAccountInput): Nullable<IamAccount> | Promise<Nullable<IamAccount>>;
    iamUpdateAccountById(payload: IamUpdateAccountByIdInput, constraint?: Nullable<QueryStatement>): Nullable<IamAccount> | Promise<Nullable<IamAccount>>;
    iamUpdateAccounts(payload: IamUpdateAccountsInput, query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<IamAccount>[] | Promise<Nullable<IamAccount>[]>;
    iamUpsertAccount(payload: IamUpdateAccountByIdInput): Nullable<IamAccount> | Promise<Nullable<IamAccount>>;
    iamDeleteAccountById(id: string, constraint?: Nullable<QueryStatement>): Nullable<IamAccount> | Promise<Nullable<IamAccount>>;
    iamDeleteAccounts(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<IamAccount>[] | Promise<Nullable<IamAccount>[]>;
    iamCreateAccounts(payload: Nullable<IamCreateAccountInput>[]): boolean | Promise<boolean>;
    iamCreateBoundedContext(payload: IamCreateBoundedContextInput): Nullable<IamBoundedContext> | Promise<Nullable<IamBoundedContext>>;
    iamCreateBoundedContexts(payload: Nullable<IamCreateBoundedContextInput>[]): boolean | Promise<boolean>;
    iamUpdateBoundedContextById(payload: IamUpdateBoundedContextByIdInput, constraint?: Nullable<QueryStatement>): Nullable<IamBoundedContext> | Promise<Nullable<IamBoundedContext>>;
    iamUpdateBoundedContexts(payload: IamUpdateBoundedContextsInput, query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<IamBoundedContext>[] | Promise<Nullable<IamBoundedContext>[]>;
    iamUpsertBoundedContext(payload: IamUpdateBoundedContextByIdInput): Nullable<IamBoundedContext> | Promise<Nullable<IamBoundedContext>>;
    iamDeleteBoundedContextById(id: string, constraint?: Nullable<QueryStatement>): Nullable<IamBoundedContext> | Promise<Nullable<IamBoundedContext>>;
    iamDeleteBoundedContexts(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<IamBoundedContext>[] | Promise<Nullable<IamBoundedContext>[]>;
    iamCreatePermissionRole(payload: IamCreatePermissionRoleInput): Nullable<IamPermissionRole> | Promise<Nullable<IamPermissionRole>>;
    iamCreatePermissionsRoles(payload: Nullable<IamCreatePermissionRoleInput>[]): boolean | Promise<boolean>;
    iamDeletePermissionRoleById(payload: IamDeletePermissionRoleInput, constraint?: Nullable<QueryStatement>): Nullable<IamPermissionRole> | Promise<Nullable<IamPermissionRole>>;
    iamDeletePermissionsRoles(payload: Nullable<IamDeletePermissionRoleInput>[], constraint?: Nullable<QueryStatement>): Nullable<IamPermissionRole>[] | Promise<Nullable<IamPermissionRole>[]>;
    iamCreatePermission(payload: IamCreatePermissionInput): Nullable<IamPermission> | Promise<Nullable<IamPermission>>;
    iamCreatePermissions(payload: Nullable<IamCreatePermissionInput>[]): boolean | Promise<boolean>;
    iamUpdatePermissionById(payload: IamUpdatePermissionByIdInput, constraint?: Nullable<QueryStatement>): Nullable<IamPermission> | Promise<Nullable<IamPermission>>;
    iamUpdatePermissions(payload: IamUpdatePermissionsInput, query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<IamPermission>[] | Promise<Nullable<IamPermission>[]>;
    iamUpsertPermission(payload: IamUpdatePermissionByIdInput): Nullable<IamPermission> | Promise<Nullable<IamPermission>>;
    iamDeletePermissionById(id: string, constraint?: Nullable<QueryStatement>): Nullable<IamPermission> | Promise<Nullable<IamPermission>>;
    iamDeletePermissions(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<IamPermission>[] | Promise<Nullable<IamPermission>[]>;
    iamCreateRole(payload: IamCreateRoleInput): Nullable<IamRole> | Promise<Nullable<IamRole>>;
    iamCreateRoles(payload: Nullable<IamCreateRoleInput>[]): boolean | Promise<boolean>;
    iamUpdateRoleById(payload: IamUpdateRoleByIdInput, constraint?: Nullable<QueryStatement>): Nullable<IamRole> | Promise<Nullable<IamRole>>;
    iamUpdateRoles(payload: IamUpdateRolesInput, query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<IamRole>[] | Promise<Nullable<IamRole>[]>;
    iamUpsertRole(payload: IamUpdateRoleByIdInput): Nullable<IamRole> | Promise<Nullable<IamRole>>;
    iamDeleteRoleById(id: string, constraint?: Nullable<QueryStatement>): Nullable<IamRole> | Promise<Nullable<IamRole>>;
    iamDeleteRoles(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<IamRole>[] | Promise<Nullable<IamRole>[]>;
    iamCreateTenant(payload: IamCreateTenantInput): Nullable<IamTenant> | Promise<Nullable<IamTenant>>;
    iamCreateTenants(payload: Nullable<IamCreateTenantInput>[]): boolean | Promise<boolean>;
    iamUpdateTenantById(payload: IamUpdateTenantByIdInput, constraint?: Nullable<QueryStatement>): Nullable<IamTenant> | Promise<Nullable<IamTenant>>;
    iamUpdateTenants(payload: IamUpdateTenantsInput, query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<IamTenant>[] | Promise<Nullable<IamTenant>[]>;
    iamUpsertTenant(payload: IamUpdateTenantByIdInput): Nullable<IamTenant> | Promise<Nullable<IamTenant>>;
    iamDeleteTenantById(id: string, constraint?: Nullable<QueryStatement>): Nullable<IamTenant> | Promise<Nullable<IamTenant>>;
    iamDeleteTenants(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<IamTenant>[] | Promise<Nullable<IamTenant>[]>;
    iamUpdateUserMetaById(payload: IamUpdateUserMetaByIdInput): Nullable<IamUserMeta> | Promise<Nullable<IamUserMeta>>;
    iamCreateUser(payload: IamCreateUserInput): Nullable<IamUser> | Promise<Nullable<IamUser>>;
    iamCreateUsers(payload: Nullable<IamCreateUserInput>[]): boolean | Promise<boolean>;
    iamUpdateUserById(payload: IamUpdateUserByIdInput, constraint?: Nullable<QueryStatement>): Nullable<IamUser> | Promise<Nullable<IamUser>>;
    iamUpdateUsers(payload: IamUpdateUsersInput, query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<IamUser>[] | Promise<Nullable<IamUser>[]>;
    iamUpsertUser(payload: IamUpdateUserByIdInput): Nullable<IamUser> | Promise<Nullable<IamUser>>;
    iamDeleteUserById(id: string, constraint?: Nullable<QueryStatement>): Nullable<IamUser> | Promise<Nullable<IamUser>>;
    iamDeleteUsers(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<IamUser>[] | Promise<Nullable<IamUser>[]>;
    oAuthDeleteAccessTokenById(id: string, constraint?: Nullable<QueryStatement>): Nullable<OAuthAccessToken> | Promise<Nullable<OAuthAccessToken>>;
    oAuthDeleteAccessTokens(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<OAuthAccessToken>[] | Promise<Nullable<OAuthAccessToken>[]>;
    oAuthCreateApplication(payload: OAuthCreateApplicationInput): Nullable<OAuthApplication> | Promise<Nullable<OAuthApplication>>;
    oAuthCreateApplications(payload: Nullable<OAuthCreateApplicationInput>[]): boolean | Promise<boolean>;
    oAuthUpdateApplicationById(payload: OAuthUpdateApplicationByIdInput, constraint?: Nullable<QueryStatement>): Nullable<OAuthApplication> | Promise<Nullable<OAuthApplication>>;
    oAuthUpdateApplications(payload: OAuthUpdateApplicationsInput, query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<OAuthApplication>[] | Promise<Nullable<OAuthApplication>[]>;
    oAuthDeleteApplicationById(id: string, constraint?: Nullable<QueryStatement>): Nullable<OAuthApplication> | Promise<Nullable<OAuthApplication>>;
    oAuthDeleteApplications(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<OAuthApplication>[] | Promise<Nullable<OAuthApplication>[]>;
    oAuthCreateClient(payload: OAuthCreateClientInput): Nullable<OAuthClient> | Promise<Nullable<OAuthClient>>;
    oAuthCreateClients(payload: Nullable<OAuthCreateClientInput>[]): boolean | Promise<boolean>;
    oAuthUpdateClientById(payload: OAuthUpdateClientByIdInput, constraint?: Nullable<QueryStatement>): Nullable<OAuthClient> | Promise<Nullable<OAuthClient>>;
    oAuthUpdateClients(payload: OAuthUpdateClientsInput, query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<OAuthClient>[] | Promise<Nullable<OAuthClient>[]>;
    oAuthUpsertClient(payload: OAuthUpdateClientByIdInput): Nullable<OAuthClient> | Promise<Nullable<OAuthClient>>;
    oAuthDeleteClientById(id: string, constraint?: Nullable<QueryStatement>): Nullable<OAuthClient> | Promise<Nullable<OAuthClient>>;
    oAuthDeleteClients(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<OAuthClient>[] | Promise<Nullable<OAuthClient>[]>;
    oAuthCreateCredentials(payload: OAuthCreateCredentialsInput): OAuthCredentials | Promise<OAuthCredentials>;
    oAuthDeleteRefreshTokenById(id: string, constraint?: Nullable<QueryStatement>): Nullable<OAuthRefreshToken> | Promise<Nullable<OAuthRefreshToken>>;
    oAuthDeleteRefreshTokens(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<OAuthRefreshToken>[] | Promise<Nullable<OAuthRefreshToken>[]>;
    oAuthCreateScope(payload: OAuthCreateScopeInput): Nullable<OAuthScope> | Promise<Nullable<OAuthScope>>;
    oAuthCreateScopes(payload: Nullable<OAuthCreateScopeInput>[]): boolean | Promise<boolean>;
    oAuthUpdateScopeById(payload: OAuthUpdateScopeByIdInput, constraint?: Nullable<QueryStatement>): Nullable<OAuthScope> | Promise<Nullable<OAuthScope>>;
    oAuthUpdateScopes(payload: OAuthUpdateScopesInput, query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<OAuthScope>[] | Promise<Nullable<OAuthScope>[]>;
    oAuthUpsertScope(payload: OAuthUpdateScopeByIdInput): Nullable<OAuthScope> | Promise<Nullable<OAuthScope>>;
    oAuthDeleteScopeById(id: string, constraint?: Nullable<QueryStatement>): Nullable<OAuthScope> | Promise<Nullable<OAuthScope>>;
    oAuthDeleteScopes(query?: Nullable<QueryStatement>, constraint?: Nullable<QueryStatement>): Nullable<OAuthScope>[] | Promise<Nullable<OAuthScope>[]>;
}

export interface IamBoundedContext {
    id: string;
    name: GraphQLString;
    root: GraphQLString;
    sort?: Nullable<GraphQLInt>;
    isActive: GraphQLBoolean;
    permissions?: Nullable<Nullable<IamPermission>[]>;
    createdAt?: Nullable<GraphQLTimestamp>;
    updatedAt?: Nullable<GraphQLTimestamp>;
    deletedAt?: Nullable<GraphQLTimestamp>;
}

export interface IamPermissionRole {
    permissionId: string;
    permission?: Nullable<IamPermission>;
    roleId: string;
    role?: Nullable<IamRole>;
}

export interface IamPermission {
    id: string;
    name: GraphQLString;
    boundedContextId: string;
    boundedContext?: Nullable<IamBoundedContext>;
    roles?: Nullable<Nullable<IamRole>[]>;
    createdAt?: Nullable<GraphQLTimestamp>;
    updatedAt?: Nullable<GraphQLTimestamp>;
    deletedAt?: Nullable<GraphQLTimestamp>;
}

export interface IamRole {
    id: string;
    name: GraphQLString;
    isMaster: GraphQLBoolean;
    permissions?: Nullable<Nullable<IamPermission>[]>;
    accounts?: Nullable<Nullable<IamAccount>[]>;
    createdAt?: Nullable<GraphQLTimestamp>;
    updatedAt?: Nullable<GraphQLTimestamp>;
    deletedAt?: Nullable<GraphQLTimestamp>;
}

export interface IamTenant {
    id: string;
    name: GraphQLString;
    code?: Nullable<GraphQLString>;
    logo?: Nullable<GraphQLString>;
    isActive: GraphQLBoolean;
    meta?: Nullable<JSON>;
    accounts?: Nullable<Nullable<IamAccount>[]>;
    createdAt?: Nullable<GraphQLTimestamp>;
    updatedAt?: Nullable<GraphQLTimestamp>;
    deletedAt?: Nullable<GraphQLTimestamp>;
}

export interface IamUserMeta {
    id: string;
    meta?: Nullable<JSON>;
}

export interface IamUser {
    id: string;
    accountId: string;
    account?: Nullable<IamAccount>;
    name: GraphQLString;
    surname?: Nullable<GraphQLString>;
    avatar?: Nullable<GraphQLString>;
    mobile?: Nullable<GraphQLString>;
    langId?: Nullable<string>;
    username: GraphQLString;
    password: GraphQLString;
    rememberToken?: Nullable<GraphQLString>;
    meta?: Nullable<JSON>;
    createdAt?: Nullable<GraphQLTimestamp>;
    updatedAt?: Nullable<GraphQLTimestamp>;
    deletedAt?: Nullable<GraphQLTimestamp>;
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

export interface OAuthApplication {
    id: string;
    code: GraphQLString;
    name: GraphQLString;
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
    scopeOptions?: Nullable<JSON>;
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

export interface OAuthCredentials {
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

export interface OAuthScope {
    id: string;
    code: GraphQLString;
    name: GraphQLString;
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
