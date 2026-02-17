export const routes = {
  home: () => "/",
  about: () => "/about",
  login: () => "/login",
  services: () => "/services",
  service: (serviceId: string) => `/services/${serviceId}`,
  adminLogin: () => "/about/login",
  adminOverview: () => "/admin/overview",
  adminForms: () => "/admin/forms",
  adminLeads: () => "/admin/leads",
  adminLead: (leadId: string) => `/admin/leads/${leadId}`,

  adminFormSection: (formId: string) => `/admin/forms/${formId}/sections`,
  adminFormQuestions: (formId: string, sectionId: string) => `/admin/forms/${formId}/sections/${sectionId}`,
};
