import Card from "../components/Card";

const GeneralPage = () => {
  return (
    <div className="space-y-6 w-full">
      {/* =========================
          HEADER
          ========================= */}
      <section className="text-left">
        <h1 className="text-2xl font-bold text-gray-800">
          Resumen de actividad
        </h1>
      </section>

      {/* =========================
          GRID PRINCIPAL
          ========================= */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {/* =========================
            CARD: FECHA Y HORA ACTUAL
            ========================= */}
        <Card
          title="Ahora"
          content={
            <div className="text-left space-y-2">
              <p className="text-sm text-gray-600">
                📅{" "}
                <span className="font-medium">
                  {new Date().toLocaleDateString("es-ES", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </p>

              <p className="text-sm text-gray-600">
                🕒{" "}
                <span className="font-medium">
                  {new Date().toLocaleTimeString("es-ES", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </p>
            </div>
          }
        />

        {/* NOTIFICACIONES */}
        <Card
          title="Notificaciones"
          content={
            <ul className="space-y-2 text-sm text-gray-600 text-left">
              <li>✔ Nueva tarea asignada a Juan</li>
              <li>✔ Informe mensual generado</li>
              <li>✔ Usuario actualizado correctamente</li>
            </ul>
          }
        />

        {/* TAREAS */}
        <Card
          title="Tareas pendientes"
          content={
            <ul className="space-y-2 text-sm text-gray-600 text-left">
              <li>• Llamar a alumno pendiente de práctica</li>
              <li>• Revisar documentación nueva</li>
              <li>• Confirmar examen teórico</li>
            </ul>
          }
        />
      </section>

      {/* =========================
          ACTIVIDAD RECIENTE
          ========================= */}
      <Card
        title="Actividad reciente"
        content={
          <ul className="divide-y text-sm text-gray-600 text-left">
            <li className="py-2 flex justify-between">
              <span>Juan completó una tarea</span>
              <span className="text-xs text-gray-400">hace 2h</span>
            </li>

            <li className="py-2 flex justify-between">
              <span>Nuevo alumno registrado</span>
              <span className="text-xs text-gray-400">hace 5h</span>
            </li>

            <li className="py-2 flex justify-between">
              <span>Informe generado automáticamente</span>
              <span className="text-xs text-gray-400">ayer</span>
            </li>
          </ul>
        }
      />
    </div>
  );
};

export default GeneralPage;
