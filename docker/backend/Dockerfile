# Build Stage
FROM maven:3.8.7-openjdk-18 AS build
#folder structure in container
WORKDIR /build
#copy pom.xml to build/
COPY pom.xml /build
RUN mvn dependency:go-offline
#copy book-network/src to build/src
COPY src /build/src
RUN mvn -f /build/pom.xml clean package -DskipTests

# Runtime stage
FROM amazoncorretto:17
#define
ARG PROFILE=dev
ARG APP_VERSION=1.0.0

WORKDIR /app
#copy the jar file created by build stage from build/taget to app/
COPY --from=build /build/target/book-network-1.0.0.jar /app/

EXPOSE 8088

ENV DB_URL=jdbc:postgresql://postgres-sql-bsn:5432/book_social_network
ENV ACTIVE_PROFILE $PROFILE
ENV JAR_VERSION $APP_VERSION
ENV EMAIL_HOSTNAME=missing_host_name
ENV EMAIL_USER_NAME=missing_user_name
ENV EMAIL_PASSWORD=missing_password

CMD java -jar -Dspring.profiles.active=${ACTIVE_PROFILE} -Dspring.datasource.url=${DB_URL} book-network-${JAR_VERSION}.jar