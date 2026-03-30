const DataDisplay = ({ data, context }) => {
  if (!data) return null;

  if (typeof data === 'string') {
    return <p className="text-slate-700 leading-relaxed">{data}</p>;
  }

  if (Array.isArray(data)) {
    return (
      <div className="space-y-2">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-start gap-3 p-2 rounded hover:bg-slate-50 transition">
            <span className="text-blue-500 font-bold mt-0.5">✓</span>
            <span className="text-slate-700 flex-1">
              {typeof item === 'string' ? item : JSON.stringify(item)}
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (typeof data === 'object') {
    return (
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-5 space-y-4 border border-slate-200">
        {Object.entries(data).map(([key, value], idx) => (
          <div
            key={key}
            className={`pb-4 ${
              idx !== Object.entries(data).length - 1 ? 'border-b border-slate-300' : ''
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="min-w-max">
                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  {key.replace(/_/g, ' ')}
                </p>
              </div>
              <div className="flex-1 bg-white rounded-lg p-3 border border-slate-200">
                {Array.isArray(value) ? (
                  <div className="space-y-2">
                    {value.map((v, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-slate-400 mt-1">•</span>
                        <span className="text-slate-800">
                          {typeof v === 'object' ? JSON.stringify(v) : v}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : typeof value === 'object' ? (
                  <pre className="text-xs bg-slate-900 text-slate-100 p-3 rounded overflow-auto max-h-48 font-mono">
                    {JSON.stringify(value, null, 2)}
                  </pre>
                ) : (
                  <p className="text-sm font-semibold text-slate-900">
                    {value?.toString() || '–'}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default DataDisplay;
