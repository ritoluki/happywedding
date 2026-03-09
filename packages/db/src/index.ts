export {
  createSupabaseClient,
  createBrowserClient,
  createServerClient,
} from "./client";

export {
  getInvitationBySlug,
  getOrderById,
  getActiveTemplates,
  getPackages,
  getCmsByKey,
  incrementInvitationView,
} from "./helpers";

export type { Database } from "./database.types";
export type {
  Profile,
  Template,
  Package,
  Order,
  Invitation,
  Guest,
  MediaAsset,
  CmsContent,
  Testimonial,
  OrderStatus,
  PaymentStatus,
  PaymentMethod,
  InvitationType,
  PackageType,
  RsvpStatus,
  Json,
} from "./database.types";
