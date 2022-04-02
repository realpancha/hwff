FROM realpancha/realpanchi:public

RUN git clone https://github.com/BlackAmda/QueenAmdi /root/QueenAmdi
WORKDIR /root/realpanchi/
ENV TZ=bakamuna/plonnaruwa
RUN npm install supervisor -g
RUN yarn install --no-audit

CMD ["node", "assets/module.js"]
