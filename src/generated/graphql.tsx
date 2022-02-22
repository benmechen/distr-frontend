import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type AwsCredentials = {
  id: Scalars['String'];
  region: Scalars['String'];
  secret: Scalars['String'];
};

/** Create a new user */
export type AdminUserCreateInput = {
  /** User's email. Must be in valid email format. */
  email: Scalars['String'];
  /** User's first name. 1-100 characters. */
  firstName: Scalars['String'];
  /** User's last name. 1-100 characters. */
  lastName: Scalars['String'];
  /** ID of organisation. Will be created automatically if not given. */
  organisationID?: Maybe<Scalars['ID']>;
  /** User's password. Min 8 characters */
  password: Scalars['String'];
  /** User access role */
  role: Scalars['String'];
};

export type AdminUserUpdateInput = {
  /** User's email. Must be in valid email format. */
  email?: Maybe<Scalars['String']>;
  /** User's first name. 1-100 characters. */
  firstName?: Maybe<Scalars['String']>;
  /** User's last name. 1-100 characters. */
  lastName?: Maybe<Scalars['String']>;
  /** Is the user's account locked */
  locked?: Maybe<Scalars['Boolean']>;
  /** ID of organisation. Will be created automatically if not given. */
  organisationID?: Maybe<Scalars['ID']>;
  /** User's password. Min 8 characters */
  password?: Maybe<Scalars['String']>;
  /** User access role */
  role?: Maybe<Scalars['String']>;
  /** User's account timeout */
  timeout?: Maybe<Scalars['DateTime']>;
};

/** Article model */
export type Article = {
  __typename?: 'Article';
  /** Article body text */
  body: Scalars['String'];
  /** Date the object was created */
  created: Scalars['DateTime'];
  /** Globally unique identifier */
  id: Scalars['ID'];
  /** URL of article's header image */
  image?: Maybe<Scalars['String']>;
  /** Article title */
  publisher: Scalars['String'];
  /** Short article description */
  teaser: Scalars['String'];
  /** Article title */
  title: Scalars['String'];
  /** Date the object was last updated */
  updated: Scalars['DateTime'];
};

/** Paginated list of articles */
export type ArticleConnection = {
  __typename?: 'ArticleConnection';
  edges?: Maybe<Array<ArticleEdge>>;
  /** Pagination details */
  pageInfo: PageInfo;
};

/** Create a new news article */
export type ArticleCreateInput = {
  /** Article body. Main article content. HTML or plaintext. Must not be empty */
  body: Scalars['String'];
  /** URL to JPG or PNG image for the article header. Must be a URL. */
  image: Scalars['String'];
  /** Article's. Must not be empty. */
  publisher: Scalars['String'];
  /** Article subtext. Short summary of the article. Must not be empty */
  teaser: Scalars['String'];
  /** Article's. Must not be empty. */
  title: Scalars['String'];
};

export type ArticleEdge = {
  __typename?: 'ArticleEdge';
  cursor: Scalars['String'];
  node: Article;
};

export type ArticleUpdateInput = {
  /** Article body. Main article content. HTML or plaintext. Must not be empty */
  body?: Maybe<Scalars['String']>;
  /** URL to JPG or PNG image for the article header. Must be a URL. */
  image?: Maybe<Scalars['String']>;
  /** Article's. Must not be empty. */
  publisher?: Maybe<Scalars['String']>;
  /** Article subtext. Short summary of the article. Must not be empty */
  teaser?: Maybe<Scalars['String']>;
  /** Article's. Must not be empty. */
  title?: Maybe<Scalars['String']>;
};

export type AzureCredentials = {
  clientId: Scalars['String'];
  secret: Scalars['String'];
  tenantId: Scalars['String'];
};

/** Field and value pair. Field must be a property on the entity. */
export type ConnectionFieldFilter = {
  /** Field name */
  field: Scalars['String'];
  /** Field value to match */
  value: Array<Scalars['String']>;
};

/** Filter a list by a query */
export type ConnectionFilter = {
  /** Collection of fields to filter by */
  fields?: Maybe<Array<ConnectionFieldFilter>>;
  /** Simple text search */
  query?: Maybe<Scalars['String']>;
};

/** Sort a list by a field */
export type ConnectionSort = {
  /** Field to sort by */
  field: Scalars['String'];
  /** Field sort order */
  order: ConnectionSortOrder;
};

/** Field sort order */
export enum ConnectionSortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}


/** Single deployement in a system */
export type Deployment = {
  __typename?: 'Deployment';
  /** Date the object was created */
  created: Scalars['DateTime'];
  /** Globally unique identifier */
  id: Scalars['ID'];
  /** Deployment name */
  name: Scalars['String'];
  resources: Array<Resource>;
  system: System;
  /** Date the object was last updated */
  updated: Scalars['DateTime'];
};

export type DeploymentCreateInput = {
  credentials: DeploymentCredentialsInput;
  /** Deployment name */
  name: Scalars['String'];
};

export type DeploymentCredentialsInput = {
  aws?: Maybe<AwsCredentials>;
  azure?: Maybe<AzureCredentials>;
  other?: Maybe<OtherCredentials>;
};

export type DeploymentEdge = {
  __typename?: 'DeploymentEdge';
  cursor: Scalars['String'];
  node: Deployment;
};

export type DeploymentUpdateInput = {
  credentials?: Maybe<DeploymentCredentialsInput>;
  /** Deployment name */
  name?: Maybe<Scalars['String']>;
};

export type Input = {
  /** Field name */
  name: Scalars['String'];
  value?: Maybe<ValueInput>;
};


export type Mutation = {
  __typename?: 'Mutation';
  /** Admin function to create a new user */
  adminUserCreate?: Maybe<UserCreateResponse>;
  /** Admin function to delete a user */
  adminUserDelete?: Maybe<User>;
  /** Admin function to remove a user's account timeout */
  adminUserRemoveTimeout?: Maybe<User>;
  /** Admin function to set a user's account timeout */
  adminUserSetTimeout?: Maybe<User>;
  /** Admin function to update a user */
  adminUserUpdate?: Maybe<User>;
  /** Delete a set of users */
  adminUsersDelete?: Maybe<Array<Scalars['String']>>;
  /** Create a new article object */
  articleCreate?: Maybe<Article>;
  /** Delete existing article */
  articleDelete?: Maybe<Article>;
  /** Update an existing article object */
  articleUpdate?: Maybe<Article>;
  /** Delete a set of articles */
  articlesDelete: Array<Scalars['ID']>;
  deploymentCreate: Deployment;
  deploymentDelete: Scalars['Boolean'];
  deploymentUpdate: Deployment;
  /** Get an access token using the user's email and password */
  login?: Maybe<Tokens>;
  /** Revoke a refresh token */
  logout?: Maybe<Scalars['String']>;
  /** Get a new access token from a valid refresh token */
  refresh?: Maybe<Tokens>;
  requestCode: Scalars['Boolean'];
  resourceCreate: Resource;
  resourceDelete: Resource;
  resourceUpdate: Resource;
  serviceCreate: Service;
  systemCreate: System;
  systemDelete: Scalars['Boolean'];
  systemUpdate: System;
  /** Sign up for an account */
  userCreate?: Maybe<UserCreateResponse>;
  /** Delete a user */
  userDelete?: Maybe<User>;
  /** Set a self inflicted account timeout */
  userSetTimeout?: Maybe<User>;
  /** Update an existing customer's details */
  userUpdate?: Maybe<User>;
  /** Delete a set of users */
  usersDelete: Array<Scalars['ID']>;
  verifyCode: Scalars['String'];
};


export type MutationAdminUserCreateArgs = {
  input: AdminUserCreateInput;
};


export type MutationAdminUserDeleteArgs = {
  id: Scalars['String'];
};


export type MutationAdminUserRemoveTimeoutArgs = {
  id: Scalars['String'];
};


export type MutationAdminUserSetTimeoutArgs = {
  endDate: Scalars['DateTime'];
  id: Scalars['String'];
};


export type MutationAdminUserUpdateArgs = {
  id: Scalars['String'];
  input: AdminUserUpdateInput;
};


export type MutationAdminUsersDeleteArgs = {
  ids: Array<Scalars['ID']>;
};


export type MutationArticleCreateArgs = {
  input: ArticleCreateInput;
};


export type MutationArticleDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationArticleUpdateArgs = {
  id: Scalars['ID'];
  input: ArticleUpdateInput;
};


export type MutationArticlesDeleteArgs = {
  ids: Array<Scalars['ID']>;
};


export type MutationDeploymentCreateArgs = {
  input: DeploymentCreateInput;
  systemID: Scalars['ID'];
};


export type MutationDeploymentDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationDeploymentUpdateArgs = {
  id: Scalars['ID'];
  input: DeploymentUpdateInput;
};


export type MutationLoginArgs = {
  email?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  username?: Maybe<Scalars['String']>;
};


export type MutationLogoutArgs = {
  token?: Maybe<Scalars['String']>;
};


export type MutationRefreshArgs = {
  token?: Maybe<Scalars['String']>;
};


export type MutationRequestCodeArgs = {
  phone: Scalars['String'];
};


export type MutationResourceCreateArgs = {
  deploymentID: Scalars['ID'];
  input: ResourceCreateInput;
};


export type MutationResourceDeleteArgs = {
  id: Scalars['ID'];
  input?: Maybe<Array<Input>>;
};


export type MutationResourceUpdateArgs = {
  id: Scalars['ID'];
  input: ResourceUpdateInput;
};


export type MutationServiceCreateArgs = {
  input: ServiceCreateInput;
};


export type MutationSystemCreateArgs = {
  input: SystemCreateInput;
};


export type MutationSystemDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationSystemUpdateArgs = {
  id: Scalars['ID'];
  input: SystemUpdateInput;
};


export type MutationUserCreateArgs = {
  input: UserCreateInput;
};


export type MutationUserDeleteArgs = {
  id: Scalars['String'];
};


export type MutationUserSetTimeoutArgs = {
  endDate: Scalars['DateTime'];
};


export type MutationUserUpdateArgs = {
  id: Scalars['String'];
  input: UserUpdateInput;
};


export type MutationUsersDeleteArgs = {
  ids: Array<Scalars['ID']>;
};


export type MutationVerifyCodeArgs = {
  code: Scalars['String'];
};

/** Organisation model */
export type Organisation = {
  __typename?: 'Organisation';
  /** Date the object was created */
  created: Scalars['DateTime'];
  /** Globally unique identifier */
  id: Scalars['ID'];
  /** Organisation's name */
  name: Scalars['String'];
  /** Date the object was last updated */
  updated: Scalars['DateTime'];
};

export type OtherCredentials = {
  values: Scalars['JSON'];
};

/** Information about pagination in a connection */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** Are there more pages after this one? */
  hasNextPage: Scalars['Boolean'];
  /** Total number of items in the collection */
  total: Scalars['Int'];
};

export type Property = {
  __typename?: 'Property';
  /** Property name */
  name: Scalars['String'];
  value?: Maybe<Value>;
};

export type Query = {
  __typename?: 'Query';
  /** Get a single article */
  article?: Maybe<Article>;
  /** Get a paginated list of article objects */
  articles: ArticleConnection;
  /** Get mutliple articles */
  articlesMany: ArticleConnection;
  deployment: Deployment;
  /** Get the currently logged in user */
  me: User;
  resource: Resource;
  system: System;
  systems: SystemConnection;
  /** Get a single user */
  user?: Maybe<User>;
  userRegistered: UserExistsResponse;
  /** Get a paginated list of user objects */
  users: UserConnection;
  /** Get mutliple users */
  usersMany: UserConnection;
};


export type QueryArticleArgs = {
  id: Scalars['String'];
};


export type QueryArticlesArgs = {
  filter?: Maybe<ConnectionFilter>;
  limit: Scalars['Int'];
  page?: Maybe<Scalars['Int']>;
  sort?: Maybe<ConnectionSort>;
};


export type QueryArticlesManyArgs = {
  ids: Array<Scalars['ID']>;
};


export type QueryDeploymentArgs = {
  id: Scalars['ID'];
};


export type QueryResourceArgs = {
  id: Scalars['ID'];
};


export type QuerySystemArgs = {
  id: Scalars['ID'];
};


export type QuerySystemsArgs = {
  filter?: Maybe<ConnectionFilter>;
  limit: Scalars['Int'];
  page?: Maybe<Scalars['Int']>;
  sort?: Maybe<ConnectionSort>;
};


export type QueryUserArgs = {
  id: Scalars['String'];
};


export type QueryUserRegisteredArgs = {
  email: Scalars['String'];
};


export type QueryUsersArgs = {
  filter?: Maybe<ConnectionFilter>;
  limit: Scalars['Int'];
  page?: Maybe<Scalars['Int']>;
  sort?: Maybe<ConnectionSort>;
};


export type QueryUsersManyArgs = {
  ids: Array<Scalars['ID']>;
};

/** Single resource in a deployment */
export type Resource = {
  __typename?: 'Resource';
  /** Date the object was created */
  created: Scalars['DateTime'];
  deployment: Deployment;
  details: Array<Property>;
  /** Globally unique identifier */
  id: Scalars['ID'];
  /** Resource name */
  name: Scalars['String'];
  status: Status;
  /** Date the object was last updated */
  updated: Scalars['DateTime'];
};

export type ResourceCreateInput = {
  /** Inputs to pass to the service */
  input: Array<Input>;
  /** Resource name */
  name: Scalars['String'];
  /** ID of the service to create from */
  serviceID: Scalars['ID'];
};

export type ResourceEdge = {
  __typename?: 'ResourceEdge';
  cursor: Scalars['String'];
  node: Resource;
};

export type ResourceUpdateInput = {
  /** Inputs to pass to the service */
  input?: Maybe<Array<Input>>;
  /** Resource name */
  name?: Maybe<Scalars['String']>;
};

/** Service model */
export type Service = {
  __typename?: 'Service';
  /** Is this service blocked? */
  blocked: Scalars['Boolean'];
  /** Date the object was created */
  created: Scalars['DateTime'];
  /** Service description */
  description: Scalars['String'];
  /** Globally unique identifier */
  id: Scalars['ID'];
  /** Location at which the service's proto specification can be requested */
  introspectionURL: Scalars['String'];
  /** Service name */
  name: Scalars['String'];
  /** Location at which the service is hosted and gRPC messages can be sent */
  serviceURL: Scalars['String'];
  /** Date the object was last updated */
  updated: Scalars['DateTime'];
};

export type ServiceCreateInput = {
  description: Scalars['String'];
  /** URL of proto introspection location */
  introspectionURL: Scalars['String'];
  /** Public name of the service */
  name: Scalars['String'];
  /** URL of service */
  serviceURL: Scalars['String'];
};

export type ServiceEdge = {
  __typename?: 'ServiceEdge';
  cursor: Scalars['String'];
  node: Service;
};

/** Resource status */
export enum Status {
  Degraded = 'DEGRADED',
  Down = 'DOWN',
  Healthy = 'HEALTHY',
  Unrecognized = 'UNRECOGNIZED'
}

export type Struct = {
  __typename?: 'Struct';
  fields: Scalars['JSON'];
};

export type StructInput = {
  fields: Scalars['JSON'];
};

/** System model */
export type System = {
  __typename?: 'System';
  /** Date the object was created */
  created: Scalars['DateTime'];
  deployments: Array<Deployment>;
  /** Globally unique identifier */
  id: Scalars['ID'];
  /** System name */
  name: Scalars['String'];
  organisation: Organisation;
  /** Date the object was last updated */
  updated: Scalars['DateTime'];
};

/** Paginated list of systems */
export type SystemConnection = {
  __typename?: 'SystemConnection';
  edges?: Maybe<Array<SystemEdge>>;
  /** Pagination details */
  pageInfo: PageInfo;
};

export type SystemCreateInput = {
  /** System name */
  name: Scalars['String'];
};

export type SystemEdge = {
  __typename?: 'SystemEdge';
  cursor: Scalars['String'];
  node: System;
};

export type SystemUpdateInput = {
  /** System name */
  name?: Maybe<Scalars['String']>;
};

export type Tokens = {
  __typename?: 'Tokens';
  /** An access token allowing the user to access protected resources. Only valid for 5 minutes. */
  accessToken: Scalars['String'];
  /** Date access token expires */
  accessTokenExpiration: Scalars['DateTime'];
  /** A refresh token allowing the user to request a new access token. Valid for 90 days. */
  refreshToken: Scalars['String'];
  /** The role of the user. */
  role: Scalars['String'];
};

/** User (customer and staff) model */
export type User = {
  __typename?: 'User';
  /** Is the account activated */
  active: Scalars['Boolean'];
  /** Date the object was created */
  created: Scalars['DateTime'];
  /** User's email address - unique */
  email: Scalars['String'];
  /** User's first name */
  firstName: Scalars['String'];
  /** Globally unique identifier */
  id: Scalars['ID'];
  /** User's last name */
  lastName: Scalars['String'];
  /** Is the account locked */
  locked: Scalars['Boolean'];
  name: Scalars['String'];
  /** User's organisation */
  organisation: Organisation;
  /** User's role, specifying their access level */
  role: UserRole;
  /** User's account timeout */
  timeout?: Maybe<Scalars['DateTime']>;
  /** Date the object was last updated */
  updated: Scalars['DateTime'];
};

/** Paginated list of users */
export type UserConnection = {
  __typename?: 'UserConnection';
  edges?: Maybe<Array<UserEdge>>;
  /** Pagination details */
  pageInfo: PageInfo;
};

/** Create a new user */
export type UserCreateInput = {
  /** User's email. Must be in valid email format. */
  email: Scalars['String'];
  /** User's first name. 1-100 characters. */
  firstName: Scalars['String'];
  /** User's last name. 1-100 characters. */
  lastName: Scalars['String'];
  /** ID of organisation. Will be created automatically if not given. */
  organisationID?: Maybe<Scalars['ID']>;
  /** User's password. Min 8 characters */
  password: Scalars['String'];
};

export type UserCreateResponse = {
  __typename?: 'UserCreateResponse';
  /** Is the account activated */
  active: Scalars['Boolean'];
  /** Date the object was created */
  created: Scalars['DateTime'];
  /** User's email address - unique */
  email: Scalars['String'];
  /** User's first name */
  firstName: Scalars['String'];
  /** Globally unique identifier */
  id: Scalars['ID'];
  /** User's last name */
  lastName: Scalars['String'];
  /** Is the account locked */
  locked: Scalars['Boolean'];
  name: Scalars['String'];
  /** User's organisation */
  organisation: Organisation;
  /** User's role, specifying their access level */
  role: UserRole;
  /** User's account timeout */
  timeout?: Maybe<Scalars['DateTime']>;
  /** Access and refresh tokens for the newly created user to allow them to login in straight away */
  tokens: Tokens;
  /** Date the object was last updated */
  updated: Scalars['DateTime'];
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor: Scalars['String'];
  node: User;
};

export type UserExistsResponse = {
  __typename?: 'UserExistsResponse';
  exists: Scalars['Boolean'];
  name?: Maybe<Scalars['String']>;
};

/** Permissions the user has */
export enum UserRole {
  Admin = 'ADMIN',
  Customer = 'CUSTOMER',
  Staff = 'STAFF'
}

export type UserUpdateInput = {
  /** User's current password - required to update sensitive fields (email, password) */
  currentPassword?: Maybe<Scalars['String']>;
  /** User's email. Must be in valid email format. */
  email?: Maybe<Scalars['String']>;
  /** User's first name. 1-100 characters. */
  firstName?: Maybe<Scalars['String']>;
  /** User's last name. 1-100 characters. */
  lastName?: Maybe<Scalars['String']>;
  /** ID of organisation. Will be created automatically if not given. */
  organisationID?: Maybe<Scalars['ID']>;
  /** User's password. Min 8 characters */
  password?: Maybe<Scalars['String']>;
};

export type Value = {
  __typename?: 'Value';
  boolValue?: Maybe<Scalars['Boolean']>;
  numberValue?: Maybe<Scalars['Float']>;
  stringValue?: Maybe<Scalars['String']>;
  structValue?: Maybe<Struct>;
};

export type ValueInput = {
  boolValue?: Maybe<Scalars['Boolean']>;
  numberValue?: Maybe<Scalars['Float']>;
  stringValue?: Maybe<Scalars['String']>;
  structValue?: Maybe<StructInput>;
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'Tokens' }
    & Pick<Tokens, 'accessToken' | 'refreshToken'>
  )> }
);

export type IsRegisteredQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type IsRegisteredQuery = (
  { __typename?: 'Query' }
  & { userRegistered: (
    { __typename?: 'UserExistsResponse' }
    & Pick<UserExistsResponse, 'exists' | 'name'>
  ) }
);

export type RefreshMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type RefreshMutation = (
  { __typename?: 'Mutation' }
  & { refresh?: Maybe<(
    { __typename?: 'Tokens' }
    & Pick<Tokens, 'accessToken' | 'refreshToken'>
  )> }
);


export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
    refreshToken
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const IsRegisteredDocument = gql`
    query IsRegistered($email: String!) {
  userRegistered(email: $email) {
    exists
    name
  }
}
    `;

export function useIsRegisteredQuery(options: Omit<Urql.UseQueryArgs<IsRegisteredQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<IsRegisteredQuery>({ query: IsRegisteredDocument, ...options });
};
export const RefreshDocument = gql`
    mutation refresh($token: String!) {
  refresh(token: $token) {
    accessToken
    refreshToken
  }
}
    `;

export function useRefreshMutation() {
  return Urql.useMutation<RefreshMutation, RefreshMutationVariables>(RefreshDocument);
};