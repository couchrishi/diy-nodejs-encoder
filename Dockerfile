
FROM dkarchmer/docker-fluent-ffmpeg
WORKDIR /app
COPY . /app
ADD <KEY.json> /app/<KEY.json>
ENV GOOGLE_APPLICATION_CREDENTIALS <KEY.json>
RUN npm install
CMD [ "node", "index.js" ]

