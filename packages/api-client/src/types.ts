export type TODO = unknown;

export type Setttings = TODO;

export type Endpoints = TODO;

export type BillingAddress = TODO;

export type Cart = TODO;

export type CartItem = TODO;

export type Category = TODO;

export type Coupon = TODO;

export type Facet = TODO;

export type FacetSearchCriteria = TODO;

export type Order = TODO;

export type OrderItem = TODO;

export type PasswordResetResult = TODO;

export type Product = TODO;

export type ProductFilter = TODO;

export type Review = TODO;

export type ReviewItem = TODO;

export type User = TODO;

export type UserBillingAddress = TODO;

export type UserBillingAddressItem = TODO;

export type UserBillingAddressSearchCriteria = TODO;

export type UserShippingAddress = TODO;

export type UserShippingAddressItem = TODO;

export type UserShippingAddressSearchCriteria = TODO;

export type ShippingAddress = TODO;

export type ShippingMethod = TODO;

export type ShippingProvider = TODO;

export type Store = TODO;

export type Wishlist = TODO;

export type WishlistItem = TODO;

type Maybe<T> = T | null;

type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;

  /** The `Long` scalar type represents non-fractional signed whole numeric values.
   * Long can represent values between -(2^63) and 2^63 - 1.
   */
  Long: any;

  /** DateTime is a scalar value that represents an ISO8601 formatted date and time. */
  DateTime: any;

  /** [ISO 3166-1](http://en.wikipedia.org/wiki/ISO_3166-1) country code. */
  Country: any;

  /** Locale is a scalar value represented as a string language tag. */
  Locale: any;

  /** DateTime is a scalar value that represents an ISO8601 formatted date. */
  Date: any;

  /** Raw JSON value */
  Json: any;

  /** Array */
  Array: any;

  /** Represents a currency. Currencies are identified by their [ISO
   * 4217](http://www.iso.org/iso/home/standards/currency_codes.htm) currency codes.
   */
  Currency: any;

  /** A key that references a resource. */
  KeyReferenceInput: any;

  /** Search filter. It is represented as a string and has th same format as in REST API: "field:filter_criteria" */
  SearchFilter: any;

  /** Search sort */
  SearchSort: any;

  /** YearMonth is a scalar value that represents an ISO8601 formatted year and month. */
  YearMonth: any;

  /** The `BigDecimal` scalar type represents signed fractional values with arbitrary precision. */
  BigDecimal: any;

  /** Time is a scalar value that represents an ISO8601 formatted time. */
  Time: any;
};

export type LoginInput = {
    email: Maybe<Scalars['String']>;
    password: Maybe<Scalars['String']>;
    remember: Maybe<Scalars['Boolean']>;
};
