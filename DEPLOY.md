# Deployment

## Deploying on Google Cloud

### Creating or Updating Cloud Function

Using one function to rule them all:

```shell
gcloud functions deploy icon1 \
  --runtime nodejs16 --trigger-http \
  --memory=128MB --allow-unauthenticated \
  --region europe-west1 --source packages/icon1-api/build \
  --service-account=your-sec-email@gcloud-project.iam.gserviceaccount.com
```

Now replace `%GCF_URL%` in [packages/icon1-api/api.json](packages/icon1-api/api.json) with the URL of the cloud function.

### Creating Api Gateway

```shell
gcloud api-gateway api-configs create "icon1-api-v0-0-0-0" \
  --openapi-spec=packages/icon1-api/api.json --api="icon1-api" \
  --project="gcloud-project" --backend-auth-service-account=your-sec-email@gcloud-project.iam.gserviceaccount.com

gcloud api-gateway gateways create "icon1-api-gw" \
  --api="icon1-api" --api-config="icon1-api-v0-0-0-0" \
  --location="europe-west1" --project=gcloud-project
```

### Updating Api Gateway

```shell
# create new config
gcloud api-gateway api-configs create "icon1-api-v0-0-1-0" \
  --openapi-spec=packages/icon1-api/api.json --api="icon1-api" \
  --project="gcloud-project" \
  --backend-auth-service-account=your-sec-email@gcloud-project.iam.gserviceaccount.com

# attach config to gateway
gcloud api-gateway gateways update "icon1-api-gw" --api="icon1-api" --api-config="icon1-api-v0-0-1-0" --location="europe-west1" --project=gcloud-project

# delete previous config
gcloud api-gateway api-configs delete "icon1-api-v0-0-0-0" --api="icon1-api" --project=gcloud-project
```

### CDN

[Google How-To](https://cloud.google.com/api-gateway/docs/gateway-serverless-neg)

This does not work 1:1, needs some adjustments depending on your systems/requirements.

With a configured loadbalancer, it's easy to enable Google CDN.
