import {
  Alert,
  Breadcrumb,
  Button,
  buttonVariants,
  cn,
  Field,
  FormSection,
  Input,
  type KotenLocale,
  PageHeader,
  Panel,
  PanelBody,
  PanelHeader,
  PanelTitle,
  Select,
  Switch,
  Textarea,
  useKotenFormatters,
  useToast,
} from "@koten/ui";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { type ChannelId, customers, pick, type WarehouseId } from "../data";
import type { ErpCopy } from "../data/copy";

type FormState = {
  customerId: string;
  contact: string;
  email: string;
  phone: string;
  channel: ChannelId;
  warehouse: WarehouseId;
  dueDate: string;
  note: string;
  notify: boolean;
};

type FormErrors = Partial<Record<"customer" | "contact" | "email" | "dueDate", string>>;

export function OrderFormPage({ copy, locale }: { copy: ErpCopy; locale: KotenLocale }) {
  const formatters = useKotenFormatters();
  const toast = useToast();
  const navigate = useNavigate();
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<FormState>({
    customerId: "",
    contact: "",
    email: "",
    phone: "",
    channel: "web",
    warehouse: "tokyo",
    dueDate: "",
    note: "",
    notify: true,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const errorList = Object.values(errors).filter(Boolean);
  const customer = customers.find((item) => item.id === values.customerId);

  useEffect(() => {
    if (errorList.length > 0) {
      errorSummaryRef.current?.focus();
    }
  }, [errorList.length]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: FormErrors = {};

    if (!values.customerId) {
      next.customer = copy.form.errors.customer;
    }
    if (!values.contact.trim()) {
      next.contact = copy.form.errors.contact;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      next.email = copy.form.errors.email;
    }
    if (!values.dueDate) {
      next.dueDate = copy.form.errors.dueDate;
    }

    setErrors(next);

    if (Object.keys(next).length > 0) {
      return;
    }

    toast.add({
      title: copy.form.success.title,
      description: copy.form.success.description,
      type: "success",
    });
    navigate("/orders?status=pending");
  };

  return (
    <div>
      <PageHeader
        breadcrumb={
          <Breadcrumb
            label={copy.shell.breadcrumbLabel}
            onNavigate={navigate}
            items={[
              { label: copy.shell.breadcrumbHome, href: "/" },
              { label: copy.orders.title, href: "/orders" },
              { label: copy.form.title },
            ]}
          />
        }
        eyebrow={copy.form.eyebrow}
        title={copy.form.title}
        description={copy.form.description}
      />

      <form id="order-form" noValidate onSubmit={handleSubmit} className="mt-[var(--koten-gap)]">
        <div className="grid gap-[var(--koten-gap)] xl:grid-cols-[minmax(0,1fr)_300px]">
          <div className="min-w-0 space-y-[var(--koten-gap)]">
            {errorList.length > 0 ? (
              <div
                ref={errorSummaryRef}
                tabIndex={-1}
                className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
              >
                <Alert tone="danger" title={copy.form.errors.summaryTitle}>
                  <p>{copy.form.errors.summary(errorList.length)}</p>
                  <ul className="mt-1 space-y-0.5">
                    {errorList.map((message) => (
                      <li key={message} className="before:me-1 before:content-['—']">
                        {message}
                      </li>
                    ))}
                  </ul>
                </Alert>
              </div>
            ) : null}

            <FormSection title={copy.form.sections.customer} columns={2}>
              <Select
                label={copy.form.fields.customer}
                required
                value={values.customerId}
                onValueChange={(value) =>
                  setValues((current) => ({ ...current, customerId: value ?? "" }))
                }
                placeholder={copy.form.placeholders.customer}
                error={errors.customer}
                items={[
                  { value: "", label: copy.form.placeholders.customer },
                  ...customers.map((item) => ({
                    value: item.id,
                    label: pick(item.company, locale),
                  })),
                ]}
              />
              <Field
                label={copy.form.fields.contact}
                required
                error={errors.contact}
                description={customer?.contact}
              >
                <Input
                  value={values.contact}
                  placeholder={copy.form.placeholders.contact}
                  onChange={(event) =>
                    setValues((current) => ({ ...current, contact: event.target.value }))
                  }
                />
              </Field>
              <Field
                label={copy.form.fields.email}
                required
                error={errors.email}
                description={customer?.email}
              >
                <Input
                  type="email"
                  value={values.email}
                  placeholder={copy.form.placeholders.email}
                  onChange={(event) =>
                    setValues((current) => ({ ...current, email: event.target.value }))
                  }
                />
              </Field>
              <Field label={copy.form.fields.phone}>
                <Input
                  type="tel"
                  value={values.phone}
                  placeholder={copy.form.placeholders.phone}
                  onChange={(event) =>
                    setValues((current) => ({ ...current, phone: event.target.value }))
                  }
                />
              </Field>
            </FormSection>

            <FormSection title={copy.form.sections.delivery} columns={2}>
              <Select
                label={copy.form.fields.channel}
                value={values.channel}
                onValueChange={(value) =>
                  setValues((current) => ({
                    ...current,
                    channel: value === "store" || value === "phone" ? value : "web",
                  }))
                }
                items={[
                  { value: "web", label: copy.channel.web },
                  { value: "store", label: copy.channel.store },
                  { value: "phone", label: copy.channel.phone },
                ]}
              />
              <Select
                label={copy.form.fields.warehouse}
                value={values.warehouse}
                onValueChange={(value) =>
                  setValues((current) => ({
                    ...current,
                    warehouse: value === "osaka" || value === "fukuoka" ? value : "tokyo",
                  }))
                }
                items={[
                  { value: "tokyo", label: copy.warehouse.tokyo },
                  { value: "osaka", label: copy.warehouse.osaka },
                  { value: "fukuoka", label: copy.warehouse.fukuoka },
                ]}
              />
              <Field label={copy.form.fields.dueDate} required error={errors.dueDate}>
                <Input
                  type="date"
                  min="2026-10-22"
                  value={values.dueDate}
                  onChange={(event) =>
                    setValues((current) => ({ ...current, dueDate: event.target.value }))
                  }
                />
              </Field>
              <div className="flex items-end">
                <Switch
                  label={copy.form.fields.notify}
                  checked={values.notify}
                  onCheckedChange={(checked) =>
                    setValues((current) => ({ ...current, notify: checked }))
                  }
                />
              </div>
            </FormSection>

            <FormSection title={copy.form.sections.notes} columns={1}>
              <Field label={copy.form.fields.note}>
                <Textarea
                  value={values.note}
                  rows={4}
                  placeholder={copy.form.placeholders.note}
                  onChange={(event) =>
                    setValues((current) => ({ ...current, note: event.target.value }))
                  }
                />
              </Field>
            </FormSection>
          </div>

          <aside className="min-w-0">
            <Panel className="xl:sticky xl:top-14">
              <PanelHeader>
                <PanelTitle as="h2">{copy.form.summary.title}</PanelTitle>
              </PanelHeader>
              <PanelBody>
                <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-1 text-2xs">
                  <dt className="text-faint">{copy.form.fields.customer}</dt>
                  <dd className="text-end text-ink">
                    {customer ? pick(customer.company, locale) : "—"}
                  </dd>
                  <dt className="text-faint">{copy.form.fields.channel}</dt>
                  <dd className="text-end text-ink">{copy.channel[values.channel]}</dd>
                  <dt className="text-faint">{copy.form.fields.warehouse}</dt>
                  <dd className="text-end text-ink">{copy.warehouse[values.warehouse]}</dd>
                  <dt className="text-faint">{copy.form.fields.dueDate}</dt>
                  <dd className="text-end tabular-nums text-ink">
                    {values.dueDate
                      ? formatters.formatDate(`${values.dueDate}T00:00:00Z`, {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          timeZone: "UTC",
                        })
                      : "—"}
                  </dd>
                  <dt className="text-faint">{copy.form.fields.notify}</dt>
                  <dd className="text-end text-ink">{values.notify ? "✓" : "—"}</dd>
                </dl>
                <p className="mt-[var(--koten-gap)] border-t border-rule pt-2 text-2xs leading-relaxed text-muted">
                  {copy.form.summary.description}
                </p>
                <div className="mt-[var(--koten-gap)] flex flex-wrap justify-end gap-2">
                  <Link
                    to="/orders"
                    className={cn(buttonVariants({ variant: "secondary", size: "sm" }))}
                  >
                    {copy.form.summary.cancel}
                  </Link>
                  <Button type="submit" variant="primary" size="sm">
                    {copy.form.summary.submit}
                  </Button>
                </div>
              </PanelBody>
            </Panel>
          </aside>
        </div>
      </form>
    </div>
  );
}
