FROM eclipse-temurin:21-jdk

WORKDIR /app

ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar

ENV GOOGLE_APPLICATION_CREDENTIALS=/app/credentials.json

ENTRYPOINT ["sh", "-c", "java -jar app.jar"]