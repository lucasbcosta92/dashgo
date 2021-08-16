import {
  createServer,
  Factory,
  Model,
  Response,
  ActiveModelSerializer,
} from "miragejs";
import faker from "faker";

type User = {
  name: string;
  email: string;
  created_at: string;
};

export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },

    models: {
      // Partial -> Pode não conter todos os dados tipados p/ user
      user: Model.extend<Partial<User>>({}),
    },

    // gerando dados em massa
    factories: {
      user: Factory.extend({
        name(index: number) {
          return `User ${index + 1}`;
        },
        email() {
          return faker.internet.email().toLowerCase();
        },
        createdAt() {
          return faker.date.recent(10); // Data recente no intervalo de 10 dias
        },
      }),
    },

    // Setando/Criando esses dados em massa
    seeds(server) {
      server.createList("user", 200); // createList(factory, qntd de dados a serem criados)
    },

    routes() {
      this.namespace = "api"; // Todas as rotas precisam ter esse namespace -> /api/users
      this.timing = 750; // Request demoram 750 ms p/ acontecerem - delay/setTimeOut

      this.get("/users", function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams;

        const total = schema.all("user").length;

        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);

        const users = this.serialize(schema.all("user")).users.slice(
          pageStart,
          pageEnd
        );

        return new Response(
          200,
          {
            "x-total-count": String(total),
          },
          { users }
        );
      });

      this.get("/users/:id");

      this.post("/users");

      this.namespace = ""; // Retorna o namespace para o padrão vazio p/ não impactar as rotas definidas no próprio next
      this.passthrough(); // Todas as requests passam por aqui. Caso não encontre a rota, segue p/ as requests definidas em outros contextos
    },
  });

  return server;
}
