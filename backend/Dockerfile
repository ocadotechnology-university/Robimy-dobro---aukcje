FROM eclipse-temurin:21-jdk AS builder
WORKDIR /app

ARG GOOGLE_SHEET_ID
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG GOOGLE_DRIVE_FOLDER_ID
COPY ./src/main/resources/credentials.json /app/credentials.json

ENV GOOGLE_SHEET_ID=$GOOGLE_SHEET_ID
ENV GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET
ENV GOOGLE_DRIVE_FOLDER_ID=$GOOGLE_DRIVE_FOLDER_ID
ENV GOOGLE_APPLICATION_CREDENTIALS=/app/credentials.json

COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN ./mvnw dependency:go-offline
COPY ./src ./src
RUN ./mvnw clean install

FROM eclipse-temurin:21-jdk AS final
WORKDIR /app
EXPOSE 8080
COPY --from=builder /app/target/*.jar /app/app.jar
ENTRYPOINT ["java", "-jar", "/app/app.jar"]