#FROM launcher.gcr.io/google/nodejs
#FROM dkarchmervue/fluent-ffmpeg
FROM dkarchmer/docker-fluent-ffmpeg
WORKDIR /app
COPY . /app
ADD saibalaji-scratchpad-459b821e4a97.json /app/saibalaji-scratchpad-459b821e4a97.json
ENV GOOGLE_APPLICATION_CREDENTIALS saibalaji-scratchpad-459b821e4a97.json
RUN npm install
CMD [ "node", "index.js" ]

