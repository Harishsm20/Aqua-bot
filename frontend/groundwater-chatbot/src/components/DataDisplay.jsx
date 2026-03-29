const DataDisplay = ({ data, context }) => {
  if (!data) return null;

  if (typeof data === 'string') {
    return <p className="text-slate-700 leading-relaxed">{data}</p>;
  }

  if (Array.isArray(data)) {
    return (
      <div className="space-y-2">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">▸</span>
            <span className="text-slate-700">
              {typeof item === 'string' ? item : JSON.stringify(item)}
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (typeof data === 'object') {
    return (
      <div className="bg-slate-50 rounded-lg p-4 space-y-3">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="border-b border-slate-200 pb-3 last:border-0 last:pb-0">
            <div className="flex items-start gap-3">
              <div className="min-w-max">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  {key.replace(/_/g, ' ')}
                </p>
              </div>
              <div className="flex-1">
                {Array.isArray(value) ? (
                  <div className="space-y-1">
                    {value.map((v, i) => (
                      <p key={i} className="text-sm text-slate-700">
                        {typeof v === 'object' ? JSON.stringify(v) : v}
                      </p>
                    ))}
                  </div>
                ) : typeof value === 'object' ? (
                  <pre className="text-xs bg-white p-2 rounded border border-slate-200 overflow-auto">
                    {JSON.stringify(value, null, 2)}
                  </pre>
                ) : (
                  <p className="text-sm font-medium text-slate-900">
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
