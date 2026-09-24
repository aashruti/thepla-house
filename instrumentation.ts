import { logs } from "@opentelemetry/api-logs";
import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { BatchLogRecordProcessor, LoggerProvider } from "@opentelemetry/sdk-logs";

const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const endpoint = process.env.POSTHOG_LOGS_ENDPOINT;

export const loggerProvider =
  token && endpoint
    ? new LoggerProvider({
        resource: resourceFromAttributes({
          "service.name": "thepla-house-web",
          "deployment.environment": process.env.NODE_ENV ?? "unknown",
        }),
        processors: [
          new BatchLogRecordProcessor({
            exporter: new OTLPLogExporter({
              url: endpoint,
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }),
          }),
        ],
      })
    : null;

export const posthogLogger = loggerProvider?.getLogger("posthog-integration") ?? null;

export function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  if (loggerProvider) {
    logs.setGlobalLoggerProvider(loggerProvider);
  } else if (process.env.NODE_ENV === "development") {
    const missing = token ? "POSTHOG_LOGS_ENDPOINT" : "NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN";
    throw new Error(
      `${missing} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${missing} is configured`,
    );
  }
}
