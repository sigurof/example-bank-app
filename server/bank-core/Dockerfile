FROM amazoncorretto:17-alpine3.19-jdk AS build

WORKDIR /app

COPY build.gradle.kts settings.gradle.kts gradlew gradle.properties ./
COPY gradle/ gradle/
COPY src src

RUN ./gradlew buildFatJar --no-daemon


FROM amazoncorretto:17-alpine3.19-jdk AS dist

WORKDIR /app

COPY --from=build /app/build/libs/bank-core.jar ./
COPY ./dist.config.yaml ./config.yaml

EXPOSE 8080

CMD ["java", "-jar", "bank-core.jar", "-config=/app/config.yaml"]
